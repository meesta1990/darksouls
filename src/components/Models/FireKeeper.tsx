import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IFireKeeper extends IBaseModel {

}
const FireKeeper = ({
    rotation,
    scale,
    position
}: IFireKeeper) => {
    const model = require("../../assets/models/firekeeper.obj");

    return (
        <BaseModel
            model={model}
            rotation={rotation}
            scale={scale}
            position={position}
        />
    )
}

export default FireKeeper;