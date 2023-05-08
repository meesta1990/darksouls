import React from 'react'
import BaseModel, { IBaseModel } from "./BaseModel";

interface IChest extends IBaseModel {
}
const Chest = ({
    scale, position, rotation
}: IChest) => {
    const model = require("../../assets/models/chest.obj");

    return (
        <BaseModel
            model={model}
            scale={scale}
            position={position}
            rotation={rotation}
            texture={require("../../assets/models/texture_chest.jpg")}
        />
    )
}

export default Chest;