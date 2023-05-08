import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IHollowMelee extends IBaseModel {

}

const HollowMelee = ({
    scale = [0.12, 0.12, 0.12],
    position,
    rotation = [0, 9.5, 0],
    rotateToTarget
}: IHollowMelee) => {
    const model = require("../../assets/models/hollow_melee.obj");

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

export default HollowMelee;