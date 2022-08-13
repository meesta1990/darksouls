import { child, get, push, set, ref, update, onValue } from 'firebase/database';
import {TABLE_SESSIONS, TABLE_TILES} from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import { Session } from '../../entities/Session';
import {cleanFunctionsField, cleanUndefinedField} from "../../utils/Functions";
import {ChatMessage} from "../../entities/Chat";
import {User} from "../../entities/User";
import {Class} from "../../entities/Class";
import {Tile} from "../../entities/Tile";
import {getEncounters} from "../Encounters/ServiceEncounter";
import {IEncounters} from "../../entities/Encounter";


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

export const joinSession = (session: Session, user: User, choosedClass: Class) => {
    if (choosedClass && !choosedClass.choosed_stats) {
        choosedClass.choosed_stats = {
            str: 'base',
            dex: 'base',
            int: 'base',
            fth: 'base'
        };
    }

    return new Promise((resolve, reject) => {
        try {
            const playersInTheSession = session?.players;

            if (!playersInTheSession.players || playersInTheSession.players.length === 0) {
                playersInTheSession.players = [];
            }
            if (playersInTheSession && playersInTheSession.players.length < playersInTheSession.max_players) {
                choosedClass.owner = user;

                playersInTheSession?.players?.push(choosedClass);

                updateSession(session).then(resolve).catch(reject);
            }
        } catch (error) {
            reject(error);
        }
    });
}

export const createSession = (session: Session) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);
        session = cleanUndefinedField(session); // todo check 

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
        session = cleanFunctionsField(cleanUndefinedField(session));

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

export const getTile = (idTile: number) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_TILES + "/" + idTile)).then((snapshot) => {
                if (snapshot.exists()) {
                    const result = new Tile(snapshot.val());
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

export const getTiles = () => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_TILES)).then((snapshot) => {
                if (snapshot.exists()) {
                    const result: Tile[] = [];

                    snapshot.forEach((childSession: any) => {
                        result.push(new Tile(childSession.val()));
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

export const shuffleEncounters = (session: Session) => {
    return getEncounters().then((encounters: any) => {
        const encounterShuffled = []; // todo

        for (let i=3;i<session.tiles.length;i++) {
            const tile = session.tiles[i];

            const indexEncounterMiniboss = Math.floor(Math.random() * (encounters['tier_' + tile.minibossSoulsLevel?.soulsLevel].length -1));
            const indexEncounterBoss = Math.floor(Math.random() * (encounters['tier_' + tile.bossSoulsLevel?.soulsLevel].length -1));
            const encounterMiniBoss = encounters['tier_' + tile.minibossSoulsLevel?.soulsLevel][indexEncounterMiniboss];
            const encounterBoss = encounters['tier_' + tile.bossSoulsLevel?.soulsLevel][indexEncounterBoss];

            if (tile.minibossSoulsLevel && tile.bossSoulsLevel) {
                tile.minibossSoulsLevel.encounter = encounterMiniBoss;
                tile.bossSoulsLevel.encounter = encounterBoss;
            }
        }
    })
}
