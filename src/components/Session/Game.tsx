import "./Game.css";
import { useEffect, useState } from "react";
import { Session } from "../../entities/Session";
import { User } from "../../entities/User";
import Tile from "./Tile/Tile";
import { ITile } from "../../entities/Tile";
import { getTile } from "../../services/Sessions/ServiceSession";
import CommonSessionInterface from "../../entities/CommonSessionInterface";

const Game = ({
    session,
    onFocus,
    user,
    focused = false
}: CommonSessionInterface) => {
    const [currentTile, setCurrentTile] = useState<ITile>();

    const handleGameFocus = () => {
        onFocus('game');
    }

    useEffect(() => {
        setCurrentTile(session?.currentTile);
    }, []);

    return currentTile ? <Tile tile={currentTile} onTileClick={handleGameFocus} focussed={focused}/> : null
}

export default Game;
