import React from 'react'
import FireKeeper from "../../Models/FireKeeper";
import Chest from "../../Models/Chest";
import Anvil from "../../Models/Anvil";
import Door from "../../Models/Door";
import { ITileBoard } from "../../../entities/TileBoard";
import { getDoorPosition } from "../../../utils/Functions";

const BoardBonefire = ({
    tile,
    session,
    onDoorClicked
}: ITileBoard) => {
    return (
        <>
            <FireKeeper
                rotation={[0, 200, 0]}
                scale={[0.13, 0.13, 0.13]}
                position={[5, 0.12, -2]}
            />
            <Chest
                scale={[0.4, 0.4, 0.4]}
                rotation={[0, 179, 0]}
                position={[3.5, 0.12, -4]}
            />
            <Anvil
                scale={[0.3, 0.2, 0.15]}
                rotation={[0, 110, 0]}
                position={[2, 0, -2.4]}
                metalness={1}
            />
            {onDoorClicked && tile.doors?.map((door) =>
                <Door
                    key={door.position}
                    scale={[0.2, 0.15, 0.1]}
                    {...getDoorPosition(door.position)}
                    onDoorClicked={() => onDoorClicked(door, session.tiles.find((_t) => _t.id === door.idNextTile))}
                />
            )}
        </>
    );
}

export default BoardBonefire;