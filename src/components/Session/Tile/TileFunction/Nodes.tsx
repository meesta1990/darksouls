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
