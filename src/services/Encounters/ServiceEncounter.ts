import { child, get, push, set, ref, update, onValue } from 'firebase/database';
import {TABLE_ENCOUNTERS, TABLE_SESSIONS} from '../../utils/Constants';
import { database } from '../../utils/Firebase';
import { Encounter, IEncounters } from "../../entities/Encounter";
import {Session} from "../../entities/Session";
import {ITile} from "../../entities/Tile";
import {NodeGraph} from "../../entities/Node";
import {updateSession} from "../Sessions/ServiceSession";

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
export const setEncountersInTheNode = (session: Session, tile: ITile, nodeMap: NodeGraph[]) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);
        console.log(session,tile, nodeMap)
        try {
            tile.nodes = nodeMap;
            session.currentTile = tile;
            updateSession(session).then(resolve)
        } catch (error) {
            reject(error);
        }
    });
}
