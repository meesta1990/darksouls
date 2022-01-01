export interface IUser {
    email: string;
    uid: string;
    username: string;
}

export class User implements IUser {
    email: string;
    uid: string;
    username: string;

    constructor(snap: any) {
        this.email = snap?.email;
        this.uid = snap?.uid;
        this.username = snap?.username;
    }
}
