import React, {ReactElement, useEffect, useState} from 'react'
import Door from "../../Models/Door";
import { ITileBoard } from "../../../entities/TileBoard";
import {getDoorPosition, getNodePosition, getStrOppositeDoor} from "../../../utils/Functions";
import {IMob} from "../../../entities/Monster";
import EnemiesInTheTile from "./EnemiesInTheTile";
import PlayerPosition from "./PlayerPosition";

interface INormalEnemiesBoard extends ITileBoard {
    mobs?: IMob[];
}
const NormalEnemiesBoard = ({
    tile,
    session,
    onDoorClicked,
    mobs
}: INormalEnemiesBoard) => {
    return (
        <>
            {onDoorClicked && tile.doors?.map((door) =>
                <Door
                    texture={ getStrOppositeDoor(door.position) === tile.lastDoor?.position
                        ? require("../../../assets/textures/texture_red_wood.jpg")
                        : require("../../../assets/textures/texture_wood.jpg")}
                    key={door.position}
                    scale={[0.2, 0.15, 0.1]}
                    {...getDoorPosition(door.position)}
                    onDoorClicked={() => onDoorClicked(door, session.tiles.find((_t) => _t.id === door.idNextTile))}
                />
            )}
            <EnemiesInTheTile tile={tile} session={session} mobs={mobs} />
            <PlayerPosition tile={tile} session={session} />
        </>
    );
}

export default NormalEnemiesBoard;