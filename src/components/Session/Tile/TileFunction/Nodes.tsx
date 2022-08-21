import {Session} from "../../../../entities/Session";
import {ITile} from "../../../../entities/Tile";
import {Mob} from "../../../../entities/Monster";
import React, {useState} from "react";
import "./Nodes.css"

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

    const getNodes = () => {
        const nodes = [];
        const nodesObj = [];
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

        for(let j=0;j<5;j++){
            for (let i=0;i<3;i++) {
                if(j%2 !== 0 && i===2) break;
                const nodeOptionalParams: any = {};
                let className = 'node ';

                if(j % 2 === 0) {
                    className += 'type1 ';
                } else {
                    className += 'type2 ';
                }

                if(i === 0) {
                    className += 'left';
                } else if((i === 2 && j % 2 === 0) || (i === 1 && j % 2 !== 0)) {
                    className += 'right';
                }

                drawNodes++;
                nodeOptionalParams.id = 'node_' + drawNodes;
                nodeOptionalParams.className = className;
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

                if (nodeOptionalParams.creatures) {
                    for (let c = 0; c < nodeOptionalParams.creatures.length; c++) {
                        const mob = mobs?.find((_m) => _m.id == nodeOptionalParams.creatures[c].id_mob);

                        if (mob) {
                            nodeOptionalParams.creatures[c] = mob;
                        }
                    }
                }

                nodesObj.push(nodeOptionalParams);
                nodes.push(
                    <span key={'node_' + j + '_' +i} {...nodeOptionalParams}>
                        {nodeOptionalParams.creatures &&
                            <div className="wrapper-creatures">
                                {nodeOptionalParams.creatures.map((_creature: any, index: number)=>
                                        <span className="creature-icon" key={'creature_' + j + '_' + drawNodes + '_' + _creature.id + index}>
                                            <img src={_creature.src_icon} />
                                        </span>
                                )}
                            </div>
                        }

                        &nbsp;
                    </span>
                )
            }
        }

        return nodes;
    };

    //connections of the node
    const mapNode = (node: any, index: number) => {

    }

    return (
        <>
            {getNodes()}
        </>
    )
}

export default Nodes;
