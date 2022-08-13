import "./Game.css";
import { useEffect, useState } from "react";
import { Session } from "../../entities/Session";
import { User } from "../../entities/User";
import Tile from "./Tile/Tile";
import { IDoorPosition, ITile } from "../../entities/Tile";
import {getTile, shuffleEncounters} from "../../services/Sessions/ServiceSession";
import CommonSessionInterface from "../../entities/CommonSessionInterface";

const Game = ({
    session,
    onFocus,
    user,
    focused = false
}: CommonSessionInterface) => {
    const [currentTile, setCurrentTile] = useState<ITile>();
    const [animationClass, setAnimationClass] = useState('');
    let timeoutAnimation: any;

    const handleGameFocus = () => {
        onFocus('game');
    }

    const handleDoorClick = (position: IDoorPosition) => {
        const nextTile = session.tiles.find((t)=>t.id === position.idNextTile);
        setAnimationClass('fade-out');

        timeoutAnimation?.clearTimeout();
        timeoutAnimation = setTimeout(()=> {
            setCurrentTile(nextTile);
            setAnimationClass('fade-in');
        }, 200);
    }

    useEffect(() => {
        setCurrentTile(session?.currentTile);
    }, []);

    return currentTile ?
        <Tile
            tile={currentTile}
            animationClass={animationClass}
            onTileClick={handleGameFocus}
            focussed={focused}
            onDoorClick={handleDoorClick}
        /> : null
}

export default Game;
