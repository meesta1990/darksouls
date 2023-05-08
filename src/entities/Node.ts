
export interface IPosition {
    x: number;
    z: number;
    y: number;
}

export type VectorizedPosition = [number, number, number];

const sn = ['red_sword', 'red_cross', 'purple_star', 'purple_tree'] as const;
export type SpecialNodes = (typeof sn)[number];

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
