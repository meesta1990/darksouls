interface INode {
    id: number;
    name: string;
    creatures: any[]
}

export class Node implements INode{
    id: number;
    name: string;
    creatures: any[];

    constructor(snap?: any) {
        this.id = snap?.id;
        this.name = snap?.name;
        this.creatures = snap?.creatures;
    }
}
