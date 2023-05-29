import React, {ReactElement, useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {IEncounterSoulsLevel, ITile} from "../../../entities/Tile";
import {compareVectorizedPosition, getDoorPosition, getNodePosition} from "../../../utils/Functions";
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
import { getMobsInTheTile } from "../../../services/Mobs/ServiceMobs";

interface IEnemiesInTheTile {
    tile: ITile;
    session: Session;
    mobs?: Mob[];
    classes?: Class[]
}
const EncountersInTheTile = ({
    tile,
    session,
    mobs,
    classes
}: IEnemiesInTheTile) => {
    const [encountersInTheTile, setEncountersInTheTile] = useState<ReactElement[]>([]);
    const [queueMonsters, setQueueMonsters] = useState<Mob[]>([]);

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
        const entities: ReactElement[] = [];
        const nodeMap = tile.nodes;

        if (nodeMap) {
            nodeMap.map((node)=>{
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
                            "-1": <Chest position={position} rotateToTarget={rotateTo}/>,
                            "-2": <Tomb position={position} rotateToTarget={rotateTo}/>,
                            "-3": <Barrel position={position} rotateToTarget={rotateTo}/>,
                            "1": <HollowRanged position={position} rotateToTarget={rotateTo}/>,
                            "2": <HollowMelee position={position} rotateToTarget={rotateTo}/>,
                            "3": <SilverRanged position={position} rotateToTarget={rotateTo}/>,
                            "4": <Sentinel position={position} rotateToTarget={rotateTo}/>,
                            "5": <LargeHollow position={position} rotateToTarget={rotateTo}/>,
                            "6": <SilverMelee position={position} rotateToTarget={rotateTo}/>,
                            "1126830451": <Knight position={position} rotateToTarget={rotateTo}/>,
                            "376907387": <Assassin position={position} rotateToTarget={rotateTo}/>,
                            "1220767132": <Herald position={position} rotateToTarget={rotateTo}/>,
                            "1124565314": <Warrior position={position} rotateToTarget={rotateTo}/>,
                        };
                        entities.push(encounterComponents[encounter?.id ?? 0]);
                    })
                }
            });
        }
        setEncountersInTheTile(entities);
    }, [tile]);

    useEffect(()=> {
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

            const mob_test = mobsInTheTile[0];
            if(mob_test) {
                const test = tile.nodes.find((node)=>{
                    return node.entitiesInTheNode?.find((entity)=> {
                        let encounter: Mob|Class|undefined = mobs?.find((mob) => mob.id === entity.id);
                        if(encounter && (encounter as Mob).unique_id === mob_test.unique_id) {
                            return true;
                        }
                    });
                })
                console.log(test)
            }

        }
    }, [session.started, tile.turn]);

    return (
        <>
            {encountersInTheTile.map((el, index) =>
                React.cloneElement(el, { key: 'monster_' + index })
            )}
        </>
    )
}

export default EncountersInTheTile;