export interface IUser {
    uid: string;
    username: string;
    email: string;
}

export class User implements IUser {
    uid: string;
    username: string;
    email: string;

    constructor(snap?: any) {
        this.uid = snap?.uid;
        this.username = snap?.username;
        this.email = snap?.email;
    }
}
