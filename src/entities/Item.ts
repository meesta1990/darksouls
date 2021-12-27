import { IStats } from "./Stats";

export interface IDices {
    magic_def?: IDicesValues;
    physical_def?: IDicesValues;
    magic_atk?: IAtkTypes;
    physical_atk?: IAtkTypes;
    dodges: number;
}

export interface IStrongAtk {
    cost: number;
    atk: IDicesValues;
}

export interface IAtkTypes {
    normal: IDicesValues;
    strong_1?: IStrongAtk;
    strong_2?: IStrongAtk;
    strong_3?: IStrongAtk;
}

export interface IDicesValues {
    black?: number;
    blue?: number;
    orange?: number;
}

export interface IItem {
    name: string;
    requirements: IStats;
    img: string;
    upg_slots?: number;
    dices: IDices;
}

export class Item implements IItem {
    name: string;
    dices: IDices;
    img: string;
    requirements: IStats;
    upg_slots: number;

    constructor({
        name,
        dices,
        img,
        requirements,
        upg_slots = 0
    }: IItem) {
        this.name = name;
        this.dices = dices;
        this.img = img;
        this.requirements = requirements;
        this.upg_slots = upg_slots;
    }
}
