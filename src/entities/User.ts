export interface IUser {
    uid: string;
    username: string;
    email: string;
    emailVerified: boolean;
}

export class User implements IUser {
    uid: string;
    username: string;
    email: string;
    emailVerified: boolean;

    constructor(snap?: any) {
        this.uid = snap?.uid;
        this.username = snap?.username;
        this.email = snap?.email;
        this.emailVerified = snap?.emailVerified;
    }
}