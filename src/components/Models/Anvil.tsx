import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IAnvil extends IBaseModel {

}
const Anvil = ({
    scale,
    rotation,
    position,
    metalness,
}: IAnvil) => {
    const model = require("../../assets/models/anvil.obj");

    return (
        <BaseModel
            model={model}
            rotation={rotation}
            scale={scale}
            position={position}
            metalness={metalness}
            texture={require("../../assets/models/texture_anvil.jpg")}
        />
    )
}

export default Anvil;