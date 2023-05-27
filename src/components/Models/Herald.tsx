import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IHerald extends IBaseModel {

}

const Herald = ({
    scale = [0.15, 0.15, 0.15],
    position,
    rotation = [0, 9.5, 0],
    rotateToTarget
}: IHerald) => {
    const model = require("../../assets/models/herald.obj");

    return (
        <BaseModel
            model={model}
            scale={scale}
            position={position}
            rotation={rotation}
            rotateToTarget={rotateToTarget}
        />
    )
}

export default Herald;