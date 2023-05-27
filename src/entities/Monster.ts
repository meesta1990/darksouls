export interface ISoulsCards {
    tier_1?: number;
    tier_2?: number;
    tier_3?: number;
}

export class Mob {
    id: number;
    unique_id: string;
    name: string;
    hp: number;
    activation_order: ['mov', 'atk'];
    def: {
        physical_def: number;
        magic_def: number;
    };
    atk: {
        atk_range: number;
        dodge_difficulty: number;
        matk?: number;
        patk?: number;
        to: 'aggro' | 'nearest'
    };
    mov: {
        range: number;
        target: 'aggro' | 'nearest';
    };
    src: string;
    src_back: string;
    src_icon: string;
    level: number;
    type: 'Monster' | 'Player';

    constructor(snap: any) {
        this.id = snap?.id;
        this.unique_id = snap?.unique_id;
        this.name = snap?.name;
        this.hp = snap?.hp;
        this.activation_order = snap?.activation_order;
        this.def = snap?.def;
        this.atk = snap?.atk;
        this.mov = snap?.mov;
        this.src = snap?.src;
        this.src_back = snap?.src_back;
        this.src_icon = snap?.src_icon;
        this.level = snap?.level;
        this.type = snap?.type;
    }
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
