import "./Game.css";
import { useEffect, useState } from "react";
import { Session } from "../../entities/Session";
import { User } from "../../entities/User";
import Tile from "./Tile";
import { ITile } from "../../entities/Tile";
import { getTile } from "../../services/Sessions/ServiceSession";

interface IGame {
    session: Session;
    user: User;
}

const Game = ({
    session
}: IGame) => {
    const [currentTile, setCurrentTile] = useState<ITile>();

    useEffect(() => {
        getTile(session?.idTile).then((tile: any) => {
            console.log(tile)
            setCurrentTile(tile);
        })
    }, []);

    return (
        <div className="game-board">
            {currentTile && <Tile tile={currentTile}/>}
        </div>
    )
}

export default Game;