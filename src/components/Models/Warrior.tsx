import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IWarrior extends IBaseModel {

}

const Warrior = ({
    scale = [0.15, 0.15, 0.15],
    position,
    rotation = [0, 9.5, 0],
    rotateToTarget
}: IWarrior) => {
    const model = require("../../assets/models/warrior.obj");

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

export default Warrior;