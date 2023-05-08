import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ISilverMelee extends IBaseModel {

}

const SilverMelee = ({
    scale = [0.15, 0.15, 0.15],
    position,
    rotation = [0, 9.5, 0],
    rotateToTarget
}: IBaseModel) => {
    const model = require("../../assets/models/silver_melee.obj");

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

export default SilverMelee;