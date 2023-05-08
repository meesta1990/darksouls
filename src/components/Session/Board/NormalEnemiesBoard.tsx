import React, {ReactElement, useEffect, useState} from 'react'
import FireKeeper from "../../Models/FireKeeper";
import Chest from "../../Models/Chest";
import Anvil from "../../Models/Anvil";
import Door from "../../Models/Door";
import { ITileBoard } from "../../../entities/TileBoard";
import {getDoorPosition, getNodePosition, getStrOppositeDoor} from "../../../utils/Functions";
import {Encounter} from "../../../entities/Encounter";
import HollowMelee from "../../Models/HollowMelee";
import {IEncounterSoulsLevel} from "../../../entities/Tile";
import {SpecialNodes} from "../../../entities/Node";
import {IMob} from "../../../entities/Monster";
import monsterType from "*.obj";
import Monster from "../../Models/Monster";
import BaseModel, {IBaseModel} from "../../Models/BaseModel";
import HollowRanged from "../../Models/HollowRanged";
import SilverRanged from "../../Models/SilverRanged";
import Sentinel from "../../Models/Sentinel";
import LargeHollow from "../../Models/LargeHollow";
import SilverMelee from "../../Models/SilverMelee";
import EnemiesInTheTile from "./EnemiesInTheTile";

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
                    texture={ getStrOppositeDoor(door.position) === tile.lastDoor?.position ? require("../../../assets/textures/texture_red_wood.jpg"): require("../../../assets/textures/texture_wood.jpg")}
                    key={door.position}
                    scale={[0.2, 0.15, 0.1]}
                    {...getDoorPosition(door.position)}
                    onDoorClicked={() => onDoorClicked(door, session.tiles.find((_t) => _t.id === door.idNextTile))}
                />
            )}
            <EnemiesInTheTile tile={tile} session={session} mobs={mobs} />
        </>
    );
}

export default NormalEnemiesBoard;