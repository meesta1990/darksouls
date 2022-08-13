import { child, get, push, set, ref, update, onValue } from 'firebase/database';
import { TABLE_ENCOUNTERS } from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import { Encounter, IEncounters } from "../../entities/Encounter";

export const getEncounters = () => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            get(child(dbRef, TABLE_ENCOUNTERS)).then((snapshot) => {
                if (snapshot.exists()) {
                    const result: IEncounters = {};

                    snapshot.forEach((encounters: any) => {
                        const tier = encounters.key;

                        result[tier] = [];
                        encounters?.forEach((key: any) => {
                            result[tier].push(new Encounter(key.val()))
                        });
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
