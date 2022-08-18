import {Session} from "../../../../entities/Session";
import {ITile} from "../../../../entities/Tile";
import {Mob} from "../../../../entities/Monster";
import React, {useState} from "react";

interface INodes {
    session?: Session;
    tile: ITile;
    onNodeClick(): void;
    mobs?: Mob[];
};

const Nodes = ({
   session,
   tile,
   onNodeClick,
   mobs
}: INodes) => {
    let drawNodes = 0;

    const getNodes = (row: number) => {
        const nodes = [];
        let mobSelector = null;
        let mobsInTheTile = null;
        const positionRedSword = tile.special_nodes.find((sp) => sp.id === 'red_sword')
        const positionRedCross = tile.special_nodes.find((sp) => sp.id === 'red_cross')
        const positionPurpleStar = tile.special_nodes.find((sp) => sp.id === 'purple_star')
        const positionPurpleTree = tile.special_nodes.find((sp) => sp.id === 'purple_tree')

        if (session) {
            mobSelector = session?.miniboss_defeated ? 'bossSoulsLevel' : 'minibossSoulsLevel';
            mobsInTheTile = tile[mobSelector];
        }

        for (let i=0;i<5;i++) {
            const drawNode = (row % 2 !== 0 && i % 2 === 0) || (row % 2 === 0 && i % 2 !== 0);
            const nodeOptionalParams: any = {};

            if (drawNode) {
                drawNodes++;
                nodeOptionalParams.id = 'node_' + drawNodes;
                nodeOptionalParams.className = 'node';
                nodeOptionalParams.onClick = onNodeClick;

                if (drawNodes - 1 === positionRedSword?.position) {
                    nodeOptionalParams.special_nodes = positionRedSword.id;
                    nodeOptionalParams.creatures = mobsInTheTile.encounter[positionRedSword.id]
                }
                if (drawNodes - 1 === positionRedCross?.position) {
                    nodeOptionalParams.special_nodes = positionRedCross.id;
                    nodeOptionalParams.creatures = mobsInTheTile.encounter[positionRedCross.id]
                }
                if (drawNodes - 1 === positionPurpleStar?.position) {
                    nodeOptionalParams.special_nodes = positionPurpleStar.id;
                    nodeOptionalParams.creatures = mobsInTheTile.encounter[positionPurpleStar.id]
                }
                if (drawNodes - 1 === positionPurpleTree?.position) {
                    nodeOptionalParams.special_nodes = positionPurpleTree.id;
                    nodeOptionalParams.creatures = mobsInTheTile.encounter[positionPurpleTree.id]
                }
            }

            if (nodeOptionalParams.creatures) {
                for (let i = 0; i < nodeOptionalParams.creatures.length; i++) {
                    const mob = mobs?.find((_m) => _m.id == nodeOptionalParams.creatures[i].id_mob);

                    if (mob) {
                        nodeOptionalParams.creatures[i] = mob;
                    }
                }
            }

            nodes.push(
                <span key={'node_' + row + '_' +i} className="wrapper-node">
                    <span {...nodeOptionalParams}>
                        {nodeOptionalParams.creatures?.map((_creature: any, index: number)=>
                            <span className="creature-icon" key={'creature_' + row + '_' + drawNodes + '_' + _creature.id + index}>
                                <img src={_creature.src_icon} />
                            </span>
                        )}
                        &nbsp;
                    </span>
                </span>
            )
        }

        return nodes;
    };

    return (
        <>
            {[...Array(5)].map((x, i) =>
                <span key={'row-nodes-row-' + i} className={"row-nodes row-" + (i+1)}>
                    {getNodes(i+1)}
                </span>
            )}
        </>
    )
}

export default Nodes;
