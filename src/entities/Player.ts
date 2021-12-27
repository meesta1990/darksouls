export interface IPlayer {
    id: string;
    name?: string;
}

export class Player implements IPlayer {
    id: string;
    name?: string;

    constructor(snap: any) {
        this.id = snap?.stats;
        this.name = snap?.name;
    }
}
