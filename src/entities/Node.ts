import {Mob} from "./Monster";
import {Class} from "./Class";

export interface IPosition {
    x: number;
    z: number;
    y: number;
}

export type VectorizedPosition = [number, number, number];

const sn = ['red_sword', 'red_cross', 'purple_star', 'purple_tree'] as const;
export type SpecialNodes = (typeof sn)[number];
export type idNodeGraph = 0|1|2|3|4|5|6|7|8|9|10|11|12;

interface INode {
    id: SpecialNodes;
    creatures: any[];
    position: number;
}

export class Node implements INode{
    id: SpecialNodes;
    creatures: any[];
    position: number;

    constructor(snap?: any) {
        this.id = snap?.id;
        this.creatures = snap?.creatures;
        this.position = snap?.position;
    }
}

export interface NodeGraph {
    id: idNodeGraph;
    adjacentNodes: {
        top?: idNodeGraph;
        bottom?: idNodeGraph;
        left?: idNodeGraph;
        right?: idNodeGraph;
        topRight?: idNodeGraph;
        topLeft?: idNodeGraph;
        bottomRight?: idNodeGraph;
        bottomLeft?: idNodeGraph;
    }
    coordinates: VectorizedPosition;
    entitiesInTheNode?: (Mob | Class)[];
}