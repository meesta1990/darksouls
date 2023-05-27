import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IKnight extends IBaseModel {

}

const Knight = ({
    scale = [0.15, 0.15, 0.15],
    position,
    rotation = [0, 9.5, 0],
    rotateToTarget
}: IKnight) => {
    const model = require("../../assets/models/knight.obj");

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

export default Knight;