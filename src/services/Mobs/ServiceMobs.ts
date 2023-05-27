import { child, get, push, set, ref, update, onValue } from 'firebase/database';
import {TABLE_MOBS, TABLE_SESSIONS} from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import {Mob} from "../../entities/Monster";
import {Session} from "../../entities/Session";
import {Encounter} from "../../entities/Encounter";

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

export const getMobsInTheTile = (session: Session): Mob[] => {
    const mobs: Mob[] = [];

    if(session.currentTile && session.currentTile.nodes) {
        session.currentTile.nodes.map((node)=> {
            if(node.entitiesInTheNode) {
                node.entitiesInTheNode.map((entity) => {
                    if((entity as Mob).type === 'Monster' && entity.level > 0){
                        mobs.push((entity as Mob))
                    }
                })
            }
        })
    }
    return mobs;
}