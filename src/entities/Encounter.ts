import { IMob } from "./Monster";

export interface IEncounters {
    tier_1?: IEncounter[],
    tier_2?: IEncounter[]
    tier_3?: IEncounter[]
}

export interface IEncounter {
    id?: string;
    name: string;
    red_sword?: IMob[];
    red_cross?: IMob[];
    purple_star?: IMob[];
    purple_tree?: IMob[];
    traps?: boolean;
    src: string;
}

export class Encounter implements IEncounter {
    id?: string;
    name: string;
    red_sword: IMob[];
    red_cross: IMob[];
    purple_star: IMob[];
    purple_tree: IMob[];
    traps: boolean;
    src: string;

    constructor(snap: any) {
        this.id = snap?.id;
        this.name = snap?.name;
        this.red_sword = snap?.red_sword;
        this.red_cross = snap?.red_cross;
        this.purple_star = snap?.purple_star;
        this.purple_tree = snap?.purple_tree;
        this.traps = snap?.traps;
        this.src = snap?.src;
    }
}
