import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ISentinel extends IBaseModel {

}

const Sentinel = ({
    scale = [0.15, 0.15, 0.15],
    position,
    rotation,
    rotateToTarget
}: ISentinel) => {
    const model = require("../../assets/models/sentinel.obj");

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

export default Sentinel;