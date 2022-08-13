interface IEncounterMob {
    id_mob: number;
}

export interface IEncounter {
    id?: string;
    name: string;
    node_1?: IEncounterMob[];
    node_2?: IEncounterMob[];
    node_3?: IEncounterMob[];
    node_4?: IEncounterMob[];
    traps?: boolean;
    src: string;
}

export class Encounter implements IEncounter {
    id?: string;
    name: string;
    node_1: IEncounterMob[];
    node_2: IEncounterMob[];
    node_3: IEncounterMob[];
    node_4: IEncounterMob[];
    traps: boolean;
    src: string;

    constructor(snap: any) {
        this.id = snap?.id;
        this.name = snap?.name;
        this.node_1 = snap?.node_1;
        this.node_2 = snap?.node_2;
        this.node_3 = snap?.node_3;
        this.node_4 = snap?.node_4;
        this.traps = snap?.traps;
        this.src = snap?.src;
    }
}
