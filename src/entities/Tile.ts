import { Node } from "./Node";
import { IMonster } from "./Monster";
import {Encounter} from "./Encounter";

export interface IDoorPosition {
    position: 'left' | 'right' | 'top' | 'bottom'
}

export interface IEncounterSoulsLevel {
    soulsLevel: number;
    encounter?: Encounter;
    monster?: IMonster;
}

export interface ITile {
    id: number;
    name: string;
    src: string;
    node_1?: Node;
    node_2?: Node;
    node_3?: Node;
    node_4?: Node;
    doors?: IDoorPosition[];
    minibossSoulsLevel?: IEncounterSoulsLevel;
    bossSoulsLevel?: IEncounterSoulsLevel;
}

export class Tile implements ITile {
    id: number;
    name: string;
    src: string;
    node_1: Node;
    node_2: Node;
    node_3: Node;
    node_4: Node;
    doors: IDoorPosition[];
    minibossSoulsLevel?: IEncounterSoulsLevel;
    bossSoulsLevel?: IEncounterSoulsLevel;

    constructor(snap: any) {
        this.id = snap?.id;
        this.name = snap?.name;
        this.src = snap?.src;
        this.node_1 = snap?.node_1;
        this.node_2 = snap?.node_2;
        this.node_3 = snap?.node_3;
        this.node_4 = snap?.node_4;
        this.doors = snap?.doors;
        this.minibossSoulsLevel = snap?.minibossSoulsLevel;
        this.bossSoulsLevel = snap?.bossSoulsLevel;
    }
}
