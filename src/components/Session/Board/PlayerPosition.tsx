import React, {useEffect} from 'react';
import {ITile} from "../../../entities/Tile";
import {Session} from "../../../entities/Session";
import {IMob} from "../../../entities/Monster";
import {getDoorPosition} from "../../../utils/Functions";

interface IPlayerPosition {
    tile: ITile;
    session: Session;
}
const PlayerPosition = ({
    tile,
    session,
}: IPlayerPosition) => {
    useEffect(()=> {
        if(tile.lastDoor) {
            const coordsLastDoor = getDoorPosition(tile.lastDoor.position);
            console.log(coordsLastDoor)
        }
    }, [tile]);

    return (
        <></>
    );
}

export default PlayerPosition;