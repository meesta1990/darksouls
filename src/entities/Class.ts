import { IStats } from './Stats';
import { IItem, Item } from './Item';
import { User } from "./User";
import {idNodeGraph} from "./Node";

export interface IClassSkill {
    id: number;
    title: string;
    body: string;
}

interface ChoosedStats {
    str: string;
    dex: string;
    int: string;
    fth: string;
}

export interface IClass {
    name: string;
    id: string;
    stats: IStats;
    choosed_stats: ChoosedStats;
    equip: Equip;
    level: number;
    class_skill: IClassSkill;
    profile_photo: string;
    src_board: string;
    type: 'Player'
}

export interface Equip {
    body?: IItem;
    weapon_1?: IItem;
    weapon_2?: IItem;
    weapon_3?: IItem;
}

export class Class implements IClass {
    name: string;
    id: string; // it's the hashcode of the classname
    stats: IStats;
    choosed_stats: ChoosedStats;
    equip: Equip;
    level: number;
    owner: User;
    class_skill: IClassSkill;
    profile_photo: string;
    src_board: string;
    type: 'Player';
    position: idNodeGraph;

    constructor(snap: any) {
        this.owner = snap?.owner;
        this.name = snap?.name;
        this.id = snap?.id;
        this.stats = snap?.stats;
        this.choosed_stats = snap?.choosedStats ? snap?.choosedStats : {
            str: 'base',
            dex: 'base',
            int: 'base',
            fth: 'base'
        };

        let body, weapon_1, weapon_2, weapon_3;

        if (snap?.starter_equip?.body) body = new Item(snap?.starter_equip?.body);
        if (snap?.starter_equip?.weapon_1) weapon_1 = new Item(snap?.starter_equip?.weapon_1);
        if (snap?.starter_equip?.weapon_2) weapon_2 = new Item(snap?.starter_equip?.weapon_2);
        if (snap?.starter_equip?.weapon_3) weapon_3 = new Item(snap?.starter_equip?.weapon_3);

        this.equip = {
            body: body,
            weapon_1: weapon_1,
            weapon_2: weapon_2,
            weapon_3: weapon_3
        };
        this.level = snap?.level;
        this.class_skill = snap?.class_skill;
        this.profile_photo = snap?.profile_photo;
        this.src_board = snap?.src_board;
        this.type = 'Player'
        this.position = snap?.position;
    }
}
