import {Node, NodeGraph} from "./Node";
import { Mob } from "./Monster";
import { Encounter } from "./Encounter";

export type IDoorPosition = 'left' | 'right' | 'top' | 'bottom';

export interface IDoor {
    position: IDoorPosition;
    idNextTile?: number;
}

export interface IEncounterSoulsLevel {
    soulsLevel: number;
    encounter?: Encounter;
    monster?: Mob;
}

export interface ITile {
    id: number;
    name: string;
    src: string;
    special_nodes: Node[];
    nodes: NodeGraph[];
    doors?: IDoor[];
    lastDoor? :IDoor; //the door I came from
    minibossSoulsLevel?: IEncounterSoulsLevel;
    bossSoulsLevel?: IEncounterSoulsLevel;
    soundtrack?: string;
    init: boolean; //if the mobs as been placed in the special nodes the first time
}

export class Tile implements ITile {
    id: number;
    name: string;
    src: string;
    special_nodes: Node[];
    nodes: NodeGraph[];
    doors: IDoor[];
    lastDoor: IDoor;
    minibossSoulsLevel?: IEncounterSoulsLevel;
    bossSoulsLevel?: IEncounterSoulsLevel;
    soundtrack?: string;
    init: boolean;

    constructor(snap: any) {
        this.id = snap?.id;
        this.name = snap?.name;
        this.src = snap?.src;
        this.special_nodes = snap?.special_nodes;
        this.nodes = snap?.nodes;
        this.doors = snap?.doors;
        this.lastDoor = snap?.lastDoor;
        this.minibossSoulsLevel = snap?.minibossSoulsLevel;
        this.bossSoulsLevel = snap?.bossSoulsLevel;
        this.soundtrack = snap?.soundtrack;
        this.init = snap?.init;
    }
}
