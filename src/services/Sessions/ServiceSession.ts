import { child, get, push, set, ref, update, onValue } from 'firebase/database';
import { TABLE_SESSIONS } from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import { Session } from '../../entities/Session';
import { cleanUndefinedField } from "../../utils/Functions";
import {ChatMessage} from "../../entities/Chat";


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

export const getSession = (sessionId: string, successCb: any, errorCb?: any) => {
    const dbRef = ref(database);

    try {
        onValue(child(dbRef, TABLE_SESSIONS + '/' + sessionId), (snapshot) => {
            if (snapshot.exists()) {
                successCb(new Session(snapshot.val()));
            } else {
                successCb(null);
            }
        }, (error) => {
            errorCb(error);
        })
    } catch (error) {
        errorCb(error);
    }
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

export const updateSession = (session: Session) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);
        session = cleanUndefinedField(session);

        try {
            update(child(dbRef, TABLE_SESSIONS + '/' + session.id), session).then((snapshot) => {
                resolve(session);
            }).catch((error) => {
                reject(error);
            });

        } catch (error) {
            reject(error);
        }
    });
}

export const sendChatMessage = (session: Session, message: ChatMessage) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);
        session = cleanUndefinedField(session);
        message = cleanUndefinedField(message);

        try {
            push(child(dbRef, TABLE_SESSIONS + '/' + session.id + '/chat/messages'), message).then((snapshot) => {
                if (snapshot.key) {
                    message.id = snapshot.key;

                    update(child(dbRef, TABLE_SESSIONS + '/' + session.id + '/chat/messages/' + message.id), message).then(()=> {
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
