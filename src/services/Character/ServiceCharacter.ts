import { child, get, ref } from 'firebase/database';
import { TABLE_CLASSES } from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import {Class} from "../../entities/Class";


export const getClass = (_class: string) => {
    return new Promise<Class|undefined>((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_CLASSES + "/" + _class)).then((snapshot) => {
                if (snapshot.exists()) {
                    const snap = snapshot.val();
                    const name = snap?.name;
                    const stats = snap?.stats;
                    const obj = new Class({
                        name: name,
                        stats: stats
                    });

                    resolve(obj);
                } else {
                    resolve(undefined);
                }
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}