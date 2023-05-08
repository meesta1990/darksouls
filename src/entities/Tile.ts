import { Node } from "./Node";
import { IMob } from "./Monster";
import { Encounter } from "./Encounter";

export type IDoorPosition = 'left' | 'right' | 'top' | 'bottom';

export interface IDoor {
    position: IDoorPosition;
    idNextTile?: number;
}

export interface IEncounterSoulsLevel {
    soulsLevel: number;
    encounter?: Encounter;
    monster?: IMob;
}

export interface ITile {
    id: number;
    name: string;
    src: string;
    special_nodes: Node[];
    doors?: IDoor[];
    lastDoor? :IDoor; //the door I came from
    minibossSoulsLevel?: IEncounterSoulsLevel;
    bossSoulsLevel?: IEncounterSoulsLevel;
    soundtrack?: string;
}

export class Tile implements ITile {
    id: number;
    name: string;
    src: string;
    special_nodes: Node[];
    doors: IDoor[];
    lastDoor: IDoor;
    minibossSoulsLevel?: IEncounterSoulsLevel;
    bossSoulsLevel?: IEncounterSoulsLevel;
    soundtrack?: string;

    constructor(snap: any) {
        this.id = snap?.id;
        this.name = snap?.name;
        this.src = snap?.src;
        this.special_nodes = snap?.special_nodes;
        this.doors = snap?.doors;
        this.lastDoor = snap?.lastDoor;
        this.minibossSoulsLevel = snap?.minibossSoulsLevel;
        this.bossSoulsLevel = snap?.bossSoulsLevel;
        this.soundtrack = snap?.soundtrack;
    }
}
