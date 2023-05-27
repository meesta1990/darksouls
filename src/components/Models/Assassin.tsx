import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IAssassin extends IBaseModel {

}

const Assassin = ({
    scale = [0.15, 0.15, 0.15],
    position,
    rotation = [0, 9.5, 0],
    rotateToTarget
}: IAssassin) => {
    const model = require("../../assets/models/assasin.obj");

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

export default Assassin;