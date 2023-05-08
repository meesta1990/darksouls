import React, {ReactElement, useEffect, useState} from "react";
import {IEncounterSoulsLevel, ITile} from "../../../entities/Tile";
import {getDoorPosition, getNodePosition} from "../../../utils/Functions";
import HollowRanged from "../../Models/HollowRanged";
import HollowMelee from "../../Models/HollowMelee";
import SilverRanged from "../../Models/SilverRanged";
import Sentinel from "../../Models/Sentinel";
import LargeHollow from "../../Models/LargeHollow";
import SilverMelee from "../../Models/SilverMelee";
import {Session} from "../../../entities/Session";
import {IMob} from "../../../entities/Monster";

interface IEnemiesInTheTile {
    tile: ITile;
    session: Session;
    mobs?: IMob[]
}
const EnemiesInTheTile = ({
    tile,
    session,
    mobs
}: IEnemiesInTheTile) => {
    const [enemiesInTheTile, setEnemiesInTheTile] = useState<ReactElement[]>([]);

    useEffect(()=> {
        const enemies: ReactElement[] = [];
        const bossStatus = session.miniboss_defeated ? 'bossSoulsLevel' : 'minibossSoulsLevel';
        const encounterSoulsLevel = (tile[bossStatus] as IEncounterSoulsLevel);

        if (encounterSoulsLevel?.encounter) {
            for(let key in encounterSoulsLevel.encounter) {
                if(key === 'red_sword' || key === 'red_cross' || key === 'purple_star' || key === 'purple_tree') {
                    for(let i=0;i<encounterSoulsLevel.encounter[key].length;i++) {
                        const idMob = Number((encounterSoulsLevel.encounter[key][i] as any).id_mob);
                        const encounter = mobs?.find((mob) => mob.id === idMob);
                        const rawPosition = tile.special_nodes.find((specialNode) => specialNode.id === key);

                        if (rawPosition) {
                            let rotateTo = undefined;
                            const offsetX = i/3.5;
                            if(tile.lastDoor && tile.lastDoor.position) {
                                rotateTo = getDoorPosition(tile.lastDoor.position, true)?.position;
                            }

                            switch (encounter?.id) {
                                case 1:
                                    enemies.push(
                                        <HollowRanged
                                            position={getNodePosition(rawPosition.position, offsetX)}
                                            rotateToTarget={rotateTo}
                                        />
                                    );
                                    break;
                                case 2:
                                    enemies.push(
                                        <HollowMelee
                                            position={getNodePosition(rawPosition.position, offsetX)}
                                            rotateToTarget={rotateTo}
                                        />
                                    );
                                    break
                                case 3:
                                    enemies.push(
                                        <SilverRanged
                                            position={getNodePosition(rawPosition.position, offsetX)}
                                            rotateToTarget={rotateTo}
                                        />
                                    );
                                    break
                                case 4:
                                    enemies.push(
                                        <Sentinel
                                            position={getNodePosition(rawPosition.position, offsetX)}
                                            rotateToTarget={rotateTo}
                                        />
                                    );
                                    break
                                case 5:
                                    enemies.push(
                                        <LargeHollow
                                            position={getNodePosition(rawPosition.position, offsetX)}
                                            rotateToTarget={rotateTo}
                                        />
                                    );
                                    break
                                case 6:
                                    enemies.push(
                                        <SilverMelee
                                            position={getNodePosition(rawPosition.position, offsetX)}
                                            rotateToTarget={rotateTo}
                                        />
                                    );
                                    break
                            }
                        }

                    }
                }
            }
        }

        setEnemiesInTheTile(enemies);
    }, [tile]);

    return (
        <>
            {enemiesInTheTile.map((el, index) =>
                React.cloneElement(el, { key: 'monster_' + index })
            )}
        </>
    )
}

export default EnemiesInTheTile;