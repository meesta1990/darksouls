import { Mob } from "./Monster";

export interface IEncounters {
    tier_1?: IEncounter[],
    tier_2?: IEncounter[]
    tier_3?: IEncounter[]
}

export interface IEncounter {
    id?: string;
    name: string;
    red_sword?: Mob[];
    red_cross?: Mob[];
    purple_star?: Mob[];
    purple_tree?: Mob[];
    traps?: boolean;
    src: string;
}

// the name "Encounter" is ambiguos. In here is referring to the card that says which monsters has to be placed.
// In some other places it could be referred to either a monster or a player
export class Encounter implements IEncounter {
    id?: string;
    name: string;
    red_sword: Mob[];
    red_cross: Mob[];
    purple_star: Mob[];
    purple_tree: Mob[];
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
