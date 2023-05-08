import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ISilverRanged extends IBaseModel {

}

const SilverRanged = ({
    scale = [0.15, 0.15, 0.15],
    position,
    rotation,
    rotateToTarget
}: IBaseModel) => {
    const model = require("../../assets/models/silver_ranged.obj");

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

export default SilverRanged;