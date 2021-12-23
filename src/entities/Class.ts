import { IStats } from './Stats';

export interface IClass {
    name: string;
    stats: IStats;
}

export class Class implements IClass {
    name: string;
    stats: IStats;

    constructor({
        name,
        stats
    }: IClass) {
        this.name = name;
        this.stats = stats;
    }
}