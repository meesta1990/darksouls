import React, {useEffect, useState} from "react";
import {getMobsInTheTile} from "../../../services/Mobs/ServiceMobs";
import {Mob} from "../../../entities/Monster";
import {Class} from "../../../entities/Class";
import {calculatePaths} from "../../../utils/Functions";
import {NodeGraph} from "../../../entities/Node";
import LineWithGlow from "../../LineWithGlow/LineWithGlow";
import {CircleGeometry, Vector3} from "three";
import {Session} from "../../../entities/Session";
import CircleGlowing from "../../CircleGlowing/CircleGlowing";

interface IEnemyPossiblePath {
    session: Session,
    monsterRoutes: any[];
    onClick(destination: NodeGraph): void;
}

const EnemyPossiblePath = ({
    session,
    monsterRoutes,
    onClick
}: IEnemyPossiblePath) => {
    const tile = session.currentTile;

    return (
        <>
            {monsterRoutes.map((route_nodes: NodeGraph[], x: number) =>
                route_nodes.map((route_node, y) =>
                    route_nodes[y] &&
                    <CircleGlowing
                        key={'route_'+x+'_'+y}
                        position={[route_nodes[y].coordinates[0], 0.2, route_nodes[y].coordinates[2]]}
                        onClick={() => onClick(route_node)}
                    />
                )
            )}
        </>
    )
}

export default EnemyPossiblePath;