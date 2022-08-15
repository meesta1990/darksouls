import { Node } from "./Node";
import { IMob } from "./Monster";
import { Encounter } from "./Encounter";

export interface IDoorPosition {
    position: 'left' | 'right' | 'top' | 'bottom';
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
    doors?: IDoorPosition[];
    minibossSoulsLevel?: IEncounterSoulsLevel;
    bossSoulsLevel?: IEncounterSoulsLevel;
}

export class Tile implements ITile {
    id: number;
    name: string;
    src: string;
    special_nodes: Node[];
    doors: IDoorPosition[];
    minibossSoulsLevel?: IEncounterSoulsLevel;
    bossSoulsLevel?: IEncounterSoulsLevel;

    constructor(snap: any) {
        this.id = snap?.id;
        this.name = snap?.name;
        this.src = snap?.src;
        this.special_nodes = snap?.special_nodes;
        this.doors = snap?.doors;
        this.minibossSoulsLevel = snap?.minibossSoulsLevel;
        this.bossSoulsLevel = snap?.bossSoulsLevel;
    }
}
