import "./Game.css";
import React, { useEffect, useState } from "react";
import { Session } from "../../entities/Session";
import { User } from "../../entities/User";
import Tile from "./Tile/Tile";
import {getTile, shuffleEncounters} from "../../services/Sessions/ServiceSession";
import CommonSessionInterface from "../../entities/CommonSessionInterface";
import {Mob} from "../../entities/Monster";
import {getMobs, getMobsInTheTile} from "../../services/Mobs/ServiceMobs";
import {updateSession} from "../../services/Sessions/ServiceSession";
import commonSessionInterface from "../../entities/CommonSessionInterface";
import Board from "./Board/Board";
import {SOUND_NEW_AREA} from "../../utils/Constants";
import {getClasses} from "../../services/Character/ServiceCharacter";
import {Class} from "../../entities/Class";

const Game = ({
    session,
    onFocus,
    user,
    focused = false,
}: commonSessionInterface) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [mobs, setMobs] = useState<Mob[]>();
    const [classes, setClasses] = useState<Class[]>();

    useEffect(() => {
        const promises = [];

        //ill join either classes and monsters together, since they are encounters with the same structure (more or less)
        promises.push(getMobs().then((_mobs: any) => {
            setMobs(_mobs);
        }));
        promises.push(getClasses().then((_classes: any) => {
            setClasses(_classes);
        }));

        Promise.all(promises).then((values) => {
            setIsLoading(false);
        });
    }, []);

    const handleGameFocus = () => {
        onFocus('game');
    }

    return session?.currentTile ?
        <Board
            session={session}
            mobs={mobs}
            classes={classes}
            user={user}
            onTileClick={handleGameFocus}
            focussed={focused}
        /> : null
}

export default Game;
