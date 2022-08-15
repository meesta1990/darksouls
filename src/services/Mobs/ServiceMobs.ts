import { child, get, push, set, ref, update, onValue } from 'firebase/database';
import { TABLE_MOBS } from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import { Mob } from "../../entities/Monster";

export const getMobs = () => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_MOBS)).then((snapshot) => {
                if (snapshot.exists()) {
                    const results: Mob[] = [];

                    snapshot.forEach((mob: any) => {
                        results.push(new Mob(mob.val()))
                    });

                    resolve(results);
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
