interface INode {
    id: 'red_sword' | 'red_cross' | 'purple_star' | 'purple_tree';
    creatures: any[];
    position: number;
}

export class Node implements INode{
    id: 'red_sword' | 'red_cross' | 'purple_star' | 'purple_tree';
    creatures: any[];
    position: number;

    constructor(snap?: any) {
        this.id = snap?.id;
        this.creatures = snap?.creatures;
        this.position = snap?.position;
    }
}
