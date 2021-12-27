import { IStats } from './Stats';
import { IItem, Item } from './Item';
import { Player } from "./Player";

export interface IClassSkill {
    id: number;
    title: string;
    body: string;
}

export interface IClass {
    name: string;
    stats: IStats;
    equip: Equip;
    level: number;
    class_skill: IClassSkill;
    profile_photo: string;
}

export interface Equip {
    body?: IItem;
    weapon_1?: IItem;
    weapon_2?: IItem;
    weapon_3?: IItem;
}

export class Class implements IClass {
    name: string;
    stats: IStats;
    equip: Equip;
    level: number;
    owner: Player;
    class_skill: IClassSkill;
    profile_photo: string;

    constructor(snap: any) {
        this.owner = snap?.owner;
        this.name = snap?.name;
        this.stats = snap?.stats;

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
    }
}
