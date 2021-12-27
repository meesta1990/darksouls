import { child, get, push, set, ref } from 'firebase/database';
import { TABLE_SESSIONS } from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import { Session } from '../../entities/Session';
import {cleanUndefinedField} from "../../utils/Functions";


export const getSessions = () => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_SESSIONS)).then((snapshot) => {
                if (snapshot.exists()) {
                    const result: Session[] = [];

                    snapshot.forEach((childSession: any) => {
                        result.push(new Session(childSession.val()));
                    });
                    resolve(result);
                } else {
                    resolve(null);
                }
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const getSession = (sessionId: string) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_SESSIONS + '/' + sessionId)).then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(new Session(snapshot.val()));
                } else {
                    resolve(null);
                }
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const createSession = (session: Session) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);
        session = cleanUndefinedField(session);

        try {
            push(child(dbRef, TABLE_SESSIONS), session).then((snapshot) => {
                if (snapshot.key) {
                    session.id = snapshot.key;

                    set(child(dbRef, TABLE_SESSIONS + '/' + session.id), session).then(()=> {
                        resolve(session);
                    });
                }
            }).catch((error) => {
                reject(error);
            });

        } catch (error) {
            reject(error);
        }
    });
}
