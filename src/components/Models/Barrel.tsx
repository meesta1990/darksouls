import React from 'react'
import BaseModel, { IBaseModel } from "./BaseModel";

interface IBarrel extends IBaseModel {
}
const Barrel = ({
    scale = [0.2, 0.2, 0.2], position, rotation
}: IBaseModel) => {
    const model = require("../../assets/models/barrel.obj");

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

export default Barrel;