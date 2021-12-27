import { child, get, ref } from 'firebase/database';
import {TABLE_BOSSES, TABLE_CLASSES} from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import { Class } from '../../entities/Class';
import { Boss } from "../../entities/Monster";


export const getClass = (_class: string) => {
    return new Promise<Class|undefined>((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_CLASSES + "/" + _class)).then((snapshot) => {
                if (snapshot.exists()) {
                    const snap = snapshot.val();
                    const obj = new Class(snap);
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

export const getBoss = (boss: string) => {
    return new Promise<Boss>((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_BOSSES + "/" + boss)).then((snapshot) => {
                if (snapshot.exists()) {
                    const snap = snapshot.val();
                    const obj = new Boss(snap);
                    resolve(obj);
                } else {
                    reject();
                }
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}
