import { child, get, ref } from 'firebase/database';
import { TABLE_SESSIONS } from '../../utils/Constants';
import { database } from '../../utils/Firebase';


export const getSessions = () => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_SESSIONS)).then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val());
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