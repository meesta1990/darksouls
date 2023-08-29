import { child, get, push, set, ref, update, onValue } from 'firebase/database';
import {TABLE_ENCOUNTERS, TABLE_SESSIONS} from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import {ITile} from "../../entities/Tile";

export const updateCurrentTile = (sessionID: string, tile: ITile) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            update(child(dbRef, TABLE_SESSIONS + '/' + sessionID + "/currentTile/"), tile).then((snapshot) => {
                resolve(true);
            }).catch((error) => {
                reject(error);
            });

        } catch (error) {
            reject(error);
        }
    });
}
