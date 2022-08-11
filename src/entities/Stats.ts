export interface IStats {
    base: GroupedStats;
    tier_1: GroupedStats;
    tier_2: GroupedStats;
    tier_3: GroupedStats;
}

interface GroupedStats {
    str: number;
    dex: number;
    int: number;
    fth: number;
}
