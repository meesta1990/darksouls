import React, { createRef, ReactElement, useEffect, useRef, useState } from "react";
import useDynamicRefs from 'use-dynamic-refs';
import { v4 as uuidv4 } from 'uuid';
import {IEncounterSoulsLevel, ITile} from "../../../entities/Tile";
import {
    calculatePaths,
    compareVectorizedPosition,
    deepCopy,
    getDoorPosition, getEntityInTheTile,
    getNodePosition
} from "../../../utils/Functions";
import HollowRanged from "../../Models/HollowRanged";
import HollowMelee from "../../Models/HollowMelee";
import SilverRanged from "../../Models/SilverRanged";
import Sentinel from "../../Models/Sentinel";
import LargeHollow from "../../Models/LargeHollow";
import SilverMelee from "../../Models/SilverMelee";
import {Session} from "../../../entities/Session";
import { Mob } from "../../../entities/Monster";
import Chest from "../../Models/Chest";
import Barrel from "../../Models/Barrel";
import Tomb from "../../Models/Tomb";
import {NodeMap} from "./MapNodeGraph";
import {setEncountersInTheNode} from "../../../services/Encounters/ServiceEncounter";
import {Class} from "../../../entities/Class";
import Knight from "../../Models/Knight";
import Herald from "../../Models/Herald";
import Warrior from "../../Models/Warrior";
import Assassin from "../../Models/Assassin";
import EnemyPossiblePath from "./EnemyPossiblePath";
import { getMobsInTheTile } from "../../../services/Mobs/ServiceMobs";
import { NodeGraph, VectorizedPosition } from "../../../entities/Node";
import {Vector3} from "three";
import ReactDOM from "react-dom";
import {Button, ThemeProvider} from "@mui/material";
import {theme} from "../../../utils/Constants";
import {updateCurrentTile} from "../../../services/Tile/TileSession";
import {moveToNextEntity} from "../../../utils/TileFunctions";

interface IEnemiesInTheTile {
    session: Session;
    mobs?: Mob[];
    classes?: Class[]
}

const EncountersInTheTile = ({
    session,
    mobs,
    classes
}: IEnemiesInTheTile) => {
    const tile = session.currentTile;
    const [encountersInTheTile, setEncountersInTheTile] = useState<ReactElement[]>([]);
    const [queueMonsters, setQueueMonsters] = useState<Mob[]>([]);
    const [monsterRoutes, setMonsterRoutes] = useState<any[]>([]);
    const [modelsRef, setModelRef] = useDynamicRefs();

    const initFirstEncounters = () => {
        if(session.currentTile && (!session.currentTile.init || !tile.nodes)) {
            const bossStatus = session.miniboss_defeated ? 'bossSoulsLevel' : 'minibossSoulsLevel';
            const encounterSoulsLevel = (tile[bossStatus] as IEncounterSoulsLevel);
            const nodeMap = new NodeMap().getNodeMap();

            if (encounterSoulsLevel?.encounter) {
                for(let key in encounterSoulsLevel.encounter) {
                    if(key === 'red_sword' || key === 'red_cross' || key === 'purple_star' || key === 'purple_tree') {
                        for(let i=0;i<encounterSoulsLevel.encounter[key].length;i++) {
                            const idMob = Number((encounterSoulsLevel.encounter[key][i] as any).id_mob);
                            const encounter = deepCopy(mobs?.find((mob) => mob.mob_type === idMob));
                            const rawPosition = tile.special_nodes.find((specialNode) => specialNode.id === key);
                            if(rawPosition && encounter) {
                                encounter.type = 'Monster';
                                encounter.id = uuidv4();
                                nodeMap[rawPosition.position].entitiesInTheNode?.push(encounter);
                            }
                        }
                    }
                }
            }
            session.currentTile.init = true;
            setEncountersInTheNode(session, session.currentTile, nodeMap);
        }
    }

    useEffect(()=> {
        initFirstEncounters();
    }, []);

    useEffect(() => {
        setMonsterRoutes([]);

        if(session.started && tile.turn && tile.turn.type === 'Monster') {
            // find the node of the first monster
            const mobsInTheTile = getMobsInTheTile(session.currentTile);
            if (mobsInTheTile) {
                mobsInTheTile.sort((a, b) => {
                    const x = a.level;
                    const y = b.level;
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
                setQueueMonsters(mobsInTheTile);
            }

            if(tile.turn) {
                const nextMonsterToFight = tile.nodes.find((node)=>{
                    return node.entitiesInTheNode?.find((entity)=> {
                        let encounter: Mob|Class|undefined = deepCopy(mobsInTheTile?.find((mob) => mob.id === entity.id));
                        if(encounter && (encounter as Mob).id === tile.turn.entity.id) {
                            return true;
                        }
                    });
                })

                if(nextMonsterToFight){
                    const route_nodes = calculatePaths(nextMonsterToFight.id, 5, tile.nodes);
                    const tempRoute: NodeGraph[] = [];

                    if(route_nodes){
                        route_nodes.map((nodeIds: number[]) => {
                            if(nodeIds.length > 1) {
                                const ng = tile.nodes.find((_node) => _node.id === nodeIds[1]);
                                if(ng) tempRoute.push(ng)
                            }
                        });

                        setMonsterRoutes(oldArray => [...oldArray, tempRoute] );
                    }
                }
            }

        }
    }, [session.started, tile.turn]);

    useEffect(() => {
        const entities: ReactElement[] = [];
        const nodeMap = tile.nodes;

        if (nodeMap) {
            nodeMap.map((node) => {
                if (node && node.entitiesInTheNode) {
                    node.entitiesInTheNode.map((entity, i) => {
                        let encounter: Mob|Class|undefined = node.entitiesInTheNode?.find((mob) => (mob as Mob).id === (entity as Mob).id);

                        if(encounter){
                            const offsetX = i / 3.5;
                            const position = getNodePosition(encounter.position ?? node.id, offsetX);

                            // if I can't find it, ill search if it's a class:
                            if(!encounter) {
                                encounter = classes?.find((_class) => _class.id === entity.id);
                            }

                            if (!position) {
                                return;
                            }
                            let rotateTo = undefined;
                            if (tile.lastDoor && tile.lastDoor.position) {
                                rotateTo = getDoorPosition(tile.lastDoor.position, true)?.position;
                            }
                            const encounterComponents = {
                                "-1": Chest,
                                "-2": Tomb,
                                "-3": Barrel,
                                "1": HollowRanged,
                                "2": HollowMelee,
                                "3": SilverRanged,
                                "4": Sentinel,
                                "5": LargeHollow,
                                "6": SilverMelee,
                                "class_1126830451": Knight,
                                "class_376907387": Assassin,
                                "class_1220767132": Herald,
                                "class_1124565314": Warrior,
                            };

                            if(encounter) {
                                if(encounter.type === 'Monster') {
                                    entities.push(createEncounter(encounterComponents[(encounter as Mob).mob_type ?? 0], position, encounter.id , rotateTo));
                                } else {
                                    entities.push(createEncounter(encounterComponents[encounter.id], position, encounter.id, rotateTo));
                                }
                            }
                        }
                    })
                }
            });
        }
        setEncountersInTheTile(entities);
    }, [tile]);

    const createEncounter = (Component: React.FunctionComponent<any>, position: VectorizedPosition, id: string, rotateToTarget?: VectorizedPosition) => {
        let focus = false;
        if(tile.turn && tile.turn.entity && tile.turn.entity.id === id) {
            focus = true;
        }

        return (
            <Component
                ref={setModelRef(id)}
                position={position}
                rotateToTarget={rotateToTarget}
                focused={focus}
                id={id}
            />
        );
    };

    const handleEncounterPathClick = (destination: NodeGraph) => {
        const modelRef: any = modelsRef(tile.turn.entity.id);
        const newPosition: VectorizedPosition = destination.coordinates;
        modelRef.current.moveToDestination(newPosition);

        // move:
        const entity = getEntityInTheTile(tile, tile.turn.entity.id);
        if(entity){
            entity.position = destination.id;
            moveToNextEntity(tile);
            updateCurrentTile(session.id, tile);
        }
    }

    return (
        <>
            {encountersInTheTile.map((el, index) =>
                React.cloneElement(el, { key: 'encounter_' + index })
            )}
            <EnemyPossiblePath
                session={session}
                onClick={handleEncounterPathClick}
                monsterRoutes={monsterRoutes}
            />
        </>
    )
}

export default EncountersInTheTile;