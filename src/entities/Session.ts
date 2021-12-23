export interface ISession {
    id: string;
    name: string;
    author: string;
    last_update: number;
    creation_date: number;
    start_date: number | undefined;
    players: any[];
    deck: any[];
    stashed_items?: any[];
    tiles: any[];
    souls?: number;
    choosed_boss: any;
    actions_done?: any[];
    sparks_left: number;
    tomb_stones?: number;
    souls_per_tile?: number;
}

export class Session implements ISession {
    id: string;
    name: string;
    author: string;
    last_update: number;
    creation_date: number;
    start_date: number | undefined;
    players: any[];
    deck: any[];
    stashed_items: any[];
    tiles: any[];
    souls?: number;
    choosed_boss: any;
    actions_done?: any[];
    sparks_left: number;
    tomb_stones: number;
    souls_per_tile?: number;

    constructor({
        id,
        name,
        author,
        last_update,
        creation_date,
        start_date,
        players,
        deck,
        stashed_items = [],
        tiles,
        souls = 0,
        choosed_boss,
        actions_done = [],
        sparks_left,
        tomb_stones = 0,
        souls_per_tile = 2
    }: ISession) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.last_update = last_update;
        this.creation_date = creation_date;
        this.start_date = start_date;
        this.players = players;
        this.deck = deck;
        this.stashed_items = stashed_items;
        this.tiles = tiles;
        this.souls = souls;
        this.choosed_boss = choosed_boss;
        this.actions_done = actions_done;
        this.sparks_left = sparks_left;
        this.tomb_stones = tomb_stones;
        this.souls_per_tile = souls_per_tile;
    }
}