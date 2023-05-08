import React from 'react'
import BaseModel, { IBaseModel } from "./BaseModel";
import {ITile} from "../../entities/Tile";

interface IDoor extends IBaseModel {
    onDoorClicked:(nextTile: ITile) => void;
}
const Door = ({
    scale,
    rotation,
    position,
    onDoorClicked,
    texture = require("../../assets/textures/texture_wood.jpg")
}: IDoor) => {
    const model = require("../../assets/models/door.obj");

    return (
        <BaseModel
            model={model}
            scale={scale}
            rotation={rotation}
            position={position}
            onClick={onDoorClicked}
            texture={texture}
        />
    )
}

export default Door;