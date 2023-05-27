import React from 'react'
import BaseModel, { IBaseModel } from "./BaseModel";

interface ITomb extends IBaseModel {
}
const Tomb = ({
    scale = [0.4, 0.4, 0.4],
    position = [0, 0, 0],
    rotation,
    rotateToTarget
}: ITomb) => {
    const model = require("../../assets/models/tomb.obj");

    return (
        <BaseModel
            model={model}
            scale={scale}
            position={[position[0], 0.17, position[2]]}
            rotation={rotation}
            rotateToTarget={rotateToTarget}
            texture={require("../../assets/textures/texture_tomb.jpg")}
        />
    )
}

export default Tomb;