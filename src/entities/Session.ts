import { Class } from './Class';
import { Boss } from './Monster';
import { User } from "./User";
import { Chat } from "./Chat";
import {Tile} from "./Tile";

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
    tiles: any[];
    actions_done?: any[];
    sparks_left: number;
    tomb_stones?: number;
    souls_per_tile?: number;
    mini_boss: Boss;
    main_boss: Boss;
    chat: Chat;
    password?: string;
    started: boolean;
    idTile: number;
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
    tiles: any[];
    actions_done?: any[];
    sparks_left: number;
    tomb_stones: number;
    souls_per_tile?: number;
    mini_boss: Boss;
    main_boss: Boss;
    chat: Chat;
    password?: string;
    started: boolean;
    idTile: number;

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
        this.tiles = snap?.tiles;
        this.actions_done = snap?.actions_done;
        this.sparks_left = snap?.sparks_left;
        this.tomb_stones = snap?.tomb_stones;
        this.souls_per_tile = snap?.souls_per_tile;
        this.mini_boss = snap?.mini_boss;
        this.main_boss = snap?.main_boss;
        this.chat = snap?.chat;
        this.password = snap?.password
        this.started = snap?.started;
        this.idTile = snap?.idTile ? snap?.idTile : 0;
    }
}
