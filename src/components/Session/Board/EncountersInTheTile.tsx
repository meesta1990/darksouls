import React, {ReactElement, useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {IEncounterSoulsLevel, ITile} from "../../../entities/Tile";
import {calculatePaths, compareVectorizedPosition, getDoorPosition, getNodePosition} from "../../../utils/Functions";
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
import {getMobsInTheTile} from "../../../services/Mobs/ServiceMobs";
import {NodeGraph, VectorizedPosition} from "../../../entities/Node";

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
    const [encountersInTheTile, setEncountersInTheTile] = useState<ReactElement[]>([]);
    const [queueMonsters, setQueueMonsters] = useState<Mob[]>([]);
    const [monsterTurn, setMonsterTurn] = useState<number>(0);
    const [monsterRoutes, setMonsterRoutes] = useState<any[]>([]);
    const tile = session.currentTile;

    const initFirstEncounters = () => {
        const sessionTile = session.tiles.find((_tile) => _tile.id === tile.id);

        if(sessionTile && (!sessionTile.init || !tile.nodes)) {
            const bossStatus = session.miniboss_defeated ? 'bossSoulsLevel' : 'minibossSoulsLevel';
            const encounterSoulsLevel = (tile[bossStatus] as IEncounterSoulsLevel);
            const nodeMap = new NodeMap().getNodeMap();

            if (encounterSoulsLevel?.encounter) {
                for(let key in encounterSoulsLevel.encounter) {
                    if(key === 'red_sword' || key === 'red_cross' || key === 'purple_star' || key === 'purple_tree') {
                        for(let i=0;i<encounterSoulsLevel.encounter[key].length;i++) {
                            const idMob = Number((encounterSoulsLevel.encounter[key][i] as any).id_mob);
                            const encounter = mobs?.find((mob) => mob.id === idMob);
                            const rawPosition = tile.special_nodes.find((specialNode) => specialNode.id === key);
                            if(rawPosition && encounter) {
                                encounter.type = 'Monster';
                                encounter.unique_id = uuidv4();
                                nodeMap[rawPosition.position].entitiesInTheNode?.push(encounter);
                            }
                        }
                    }
                }
            }
            sessionTile.init = true;
            sessionTile.turn = 'Monster';
            setEncountersInTheNode(session, sessionTile, nodeMap);
        }
    }

    useEffect(()=> {
        initFirstEncounters();
    }, []);

    useEffect(() => {
        if(session.started && tile.turn === 'Monster') {
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

            const mob_test = mobsInTheTile[monsterTurn];

            if(mob_test) {
                const nextMonsterToFight = tile.nodes.find((node)=>{
                    return node.entitiesInTheNode?.find((entity)=> {
                        let encounter: Mob|Class|undefined = mobsInTheTile?.find((mob) => mob.id === entity.id);
                        if(encounter && (encounter as Mob).unique_id === mob_test.unique_id) {
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

    const createEncounter = (Component: React.FunctionComponent<any>, position: VectorizedPosition, id?: string, rotateToTarget?: VectorizedPosition) => {
        return <Component position={position} rotateToTarget={rotateToTarget} id={id} />;
    };

    useEffect(() => {
        const entities: ReactElement[] = [];
        const nodeMap = tile.nodes;

        if (nodeMap) {
            nodeMap.map((node) => {
                if (node && node.entitiesInTheNode) {
                    node.entitiesInTheNode.map((entity, i) => {
                        let encounter: Mob|Class|undefined = mobs?.find((mob) => mob.id === entity.id);
                        const offsetX = i / 3.5;
                        const position = getNodePosition(node.id, offsetX);

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
                            "1126830451": Knight,
                            "376907387": Assassin,
                            "1220767132": Herald,
                            "1124565314": Warrior,
                        };
                        entities.push(
                            createEncounter(encounterComponents[encounter?.id ?? 0], position, (encounter as Mob).unique_id ?? encounter?.id, rotateTo)
                        );
                    })
                }
            });
        }
        setEncountersInTheTile(entities);
    }, [tile]);

    return (
        <>
            {encountersInTheTile.map((el, index) =>
                React.cloneElement(el, { key: 'encounter_' + index })
            )}
            <EnemyPossiblePath
                session={session}
                onClick={(d)=>console.log(d)}
                monsterRoutes={monsterRoutes}
            />
        </>
    )
}

export default EncountersInTheTile;