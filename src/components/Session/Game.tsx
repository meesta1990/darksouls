import "./Game.css";
import { useEffect, useState } from "react";
import { Session } from "../../entities/Session";
import { User } from "../../entities/User";
import Tile from "./Tile/Tile";
import { IDoorPosition, ITile } from "../../entities/Tile";
import {getTile, shuffleEncounters} from "../../services/Sessions/ServiceSession";
import CommonSessionInterface from "../../entities/CommonSessionInterface";
import { Mob } from "../../entities/Monster";
import {getMobs} from "../../services/Mobs/ServiceMobs";

const Game = ({
    session,
    onFocus,
    user,
    focused = false
}: CommonSessionInterface) => {
    const [currentTile, setCurrentTile] = useState<ITile>();
    const [animationClass, setAnimationClass] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [mobs, setMobs] = useState<Mob[]>();
    let timeoutAnimation: any;

    useEffect(() => {
        const promises = [];
        promises.push(getMobs().then((_mobs: any) => {
            setMobs(_mobs);
        }));

        Promise.all(promises).then((values) => {
            setIsLoading(false);
            console.log('loaded')
        });

        setCurrentTile(session?.currentTile);
    }, []);

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

    console.log('game')
    return currentTile ?
        <Tile
            session={session}
            mobs={mobs}
            user={user}
            tile={currentTile}
            animationClass={animationClass}
            onTileClick={handleGameFocus}
            focussed={focused}
            onDoorClick={handleDoorClick}
        /> : null
}

export default Game;
