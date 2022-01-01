import { User } from "./User";

export interface IMessage {
    id: string;
    author: User;
    message: string;
    sentDate: number;
}

export interface IChat {
    sessionID: string;
    messages: ChatMessage[];
}

export class Chat implements IChat {
    sessionID: string;
    messages: ChatMessage[];

    constructor(snap: any) {
        this.messages = snap?.messages;
        this.sessionID = snap?.sessionID;
    }
}

export class ChatMessage implements IMessage {
    id: string;
    author: User;
    message: string;
    sentDate: number;

    constructor(snap: any) {
        this.id = snap?.id;
        this.author = snap?.author;
        this.message = snap?.message;
        this.sentDate = snap?.sentDate;
    }
}
