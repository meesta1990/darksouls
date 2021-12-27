export interface ISoulsCards {
    tier_1?: number;
    tier_2?: number;
    tier_3?: number;
}

export interface IBoss {
    name: string;
    hp: number;
    heatpoints: number;
    level: number;
    physical_def: number;
    magic_def: number;
    preview_img: string;
    skill_cards: number;
    soul_cards: ISoulsCards;
    is_miniboss: boolean;
}

export class Boss implements IBoss {
    name: string;
    hp: number;
    heatpoints: number;
    level: number;
    physical_def: number;
    magic_def: number;
    preview_img: string;
    skill_cards: number;
    soul_cards: ISoulsCards;
    is_miniboss: boolean;

    constructor(snap: any) {
        this.hp = snap?.hp;
        this.heatpoints = snap?.heatpoints;
        this.level = snap?.level;
        this.physical_def = snap?.physical_def;
        this.magic_def = snap?.magic_def;
        this.preview_img = snap?.preview_img;
        this.skill_cards = snap?.skill_cards;
        this.soul_cards = snap?.soul_cards;
        this.name = snap?.name;
        this.soul_cards = snap?.soul_cards;
        this.is_miniboss = snap?.is_miniboss;
    }
}
