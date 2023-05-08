import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ILargeHollow extends IBaseModel {

}

const LargeHollow = ({
    scale = [0.15, 0.15, 0.15],
    position,
    rotation,
    rotateToTarget
}: ILargeHollow) => {
    const model = require("../../assets/models/large_hollow.obj");

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

export default LargeHollow;