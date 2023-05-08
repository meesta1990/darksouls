import "./Game.css";
import React, { useEffect, useState } from "react";
import { Session } from "../../entities/Session";
import { User } from "../../entities/User";
import Tile from "./Tile/Tile";
import {getTile, shuffleEncounters} from "../../services/Sessions/ServiceSession";
import CommonSessionInterface from "../../entities/CommonSessionInterface";
import { Mob } from "../../entities/Monster";
import {getMobs} from "../../services/Mobs/ServiceMobs";
import {updateSession} from "../../services/Sessions/ServiceSession";
import commonSessionInterface from "../../entities/CommonSessionInterface";
import Board from "./Board/Board";
import {SOUND_NEW_AREA} from "../../utils/Constants";

const Game = ({
    session,
    onFocus,
    user,
    focused = false,
}: commonSessionInterface) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [mobs, setMobs] = useState<Mob[]>();

    useEffect(() => {
        const promises = [];
        promises.push(getMobs().then((_mobs: any) => {
            setMobs(_mobs);
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
            user={user}
            tile={session?.currentTile}
            onTileClick={handleGameFocus}
            focussed={focused}
        /> : null
}

export default Game;
