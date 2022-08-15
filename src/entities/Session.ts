import { Class } from './Class';
import { Boss } from './Monster';
import { User } from "./User";
import { Chat } from "./Chat";
import { ITile } from "./Tile";

export interface ISessionPlayers {
    max_players: number;
    players: Class[];
}

export interface ISession {
    id: string;
    name: string;
    author: User;
    last_update: number;
    creation_date: number;
    start_date: number;
    players: ISessionPlayers;
    deck: any[];
    stashed_items?: any[];
    actions_done?: any[];
    sparks_left: number;
    tomb_stones?: number;
    souls_per_tile?: number;
    souls: number;
    mini_boss: Boss;
    main_boss: Boss;
    chat: Chat;
    password?: string;
    started: boolean;
    tiles: ITile[];
    miniboss_defeated: boolean;
    currentTile: ITile;
}

export class Session implements ISession{
    id: string;
    name: string;
    author: User;
    last_update: number;
    creation_date: number;
    start_date: number;
    players: ISessionPlayers;
    deck: any[];
    stashed_items: any[];
    actions_done?: any[];
    sparks_left: number;
    tomb_stones: number;
    souls_per_tile?: number;
    souls: number;
    mini_boss: Boss;
    main_boss: Boss;
    chat: Chat;
    password?: string;
    started: boolean;
    tiles: ITile[];
    miniboss_defeated: boolean;
    currentTile: ITile;

    constructor(snap?: any) {
        this.id = snap?.id;
        this.name = snap?.name;
        this.author = snap?.author;
        this.last_update = snap?.last_update;
        this.creation_date = snap?.creation_date;
        this.start_date = snap?.start_date;
        this.players = snap?.players;
        this.deck = snap?.deck;
        this.stashed_items = snap?.stashed_items;
        this.actions_done = snap?.actions_done;
        this.sparks_left = snap?.sparks_left;
        this.tomb_stones = snap?.tomb_stones;
        this.souls_per_tile = snap?.souls_per_tile;
        this.souls = snap?.souls;
        this.mini_boss = snap?.mini_boss;
        this.main_boss = snap?.main_boss;
        this.chat = snap?.chat;
        this.password = snap?.password
        this.started = snap?.started;
        this.tiles = snap?.tiles;
        this.miniboss_defeated = snap?.miniboss_defeated;
        this.currentTile = snap?.currentTile;
    }
}
