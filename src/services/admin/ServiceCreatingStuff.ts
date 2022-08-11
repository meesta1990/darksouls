import {child, get, onValue, push, ref, set} from "firebase/database";
import { database } from "../../utils/Firebase";
import {TABLE_ENCOUNTERS, TABLE_SESSIONS} from "../../utils/Constants";
import { Encounter } from "../../entities/Encounter";

export const getEncounters = (tierLevel: string, successCb: any, errorCb: any) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        try {
            onValue(child(dbRef, TABLE_ENCOUNTERS + '/' + tierLevel), (snapshot) => {
                if (snapshot.exists()) {
                    const result: Encounter[] = [];

                    snapshot.forEach((childSession: any) => {
                        result.push(new Encounter(childSession.val()));
                    });
                    successCb(result);
                } else {
                    successCb(null);
                }
            }, (error) => {
                errorCb(error);
            })
        } catch (error) {
            reject(error);
        }
    });
}

export const createEncounter = (encounter: Encounter, tier: string) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);

        push(child(dbRef, TABLE_ENCOUNTERS + '/' + tier), encounter).then((snapshot: any) => {
            if (snapshot.key) {
                encounter.id = snapshot.key;

                set(child(dbRef, TABLE_SESSIONS + '/' + tier + '/' + snapshot.key), encounter).then(()=> {
                    resolve(encounter);
                });
            }
        }).catch((error) => {
            reject(error);
        });
    });
}
