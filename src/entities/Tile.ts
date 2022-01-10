export interface ITile {
    id: number;
    name: string;
    src: string;
    node_1?: any;
    node_2?: any;
    node_3: any;
    node_4?: any;
}

export class Tile implements ITile {
    id: number;
    name: string;
    src: string;
    node_1: any;
    node_2: any;
    node_3: any;
    node_4: any;

    constructor(snap: any) {
        this.id = snap?.id;
        this.name = snap?.name;
        this.src = snap?.src;
        this.node_1 = snap?.node_1;
        this.node_2 = snap?.node_2;
        this.node_3 = snap?.node_3;
        this.node_4 = snap?.node_4;
    }
}
