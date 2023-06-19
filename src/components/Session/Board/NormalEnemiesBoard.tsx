import React, {ReactElement, useEffect, useState} from 'react'
import Door from "../../Models/Door";
import { ITileBoard } from "../../../entities/TileBoard";
import {getDoorPosition, getNodePosition, getStrOppositeDoor} from "../../../utils/Functions";
import {Mob} from "../../../entities/Monster";
import EncountersInTheTile from "./EncountersInTheTile";
import PlayerPosition from "./PlayerPosition";

interface INormalEnemiesBoard extends ITileBoard {
    mobs?: Mob[];
}
const NormalEnemiesBoard = ({
    session,
    onDoorClicked,
    mobs,
    classes,
    user,
    dynamicContainerDivRef
}: INormalEnemiesBoard) => {
    const tile = session.currentTile;

    useEffect(() => {
    }, [mobs])


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
                    onDoorClicked={() => !session.started ? onDoorClicked(door, session.tiles.find((_t) => _t.id === door.idNextTile)): null}
                />
            )}
            <EncountersInTheTile classes={classes} session={session} mobs={mobs} />
            <PlayerPosition session={session} user={user} dynamicContainerDivRef={dynamicContainerDivRef} />
        </>
    );
}

export default NormalEnemiesBoard;