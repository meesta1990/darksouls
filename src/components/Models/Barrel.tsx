import React from 'react'
import BaseModel, { IBaseModel } from "./BaseModel";

interface IBarrel extends IBaseModel {
}
const Barrel = (props: IBarrel) => {
    const model = require("../../assets/models/barrel.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.2, 0.2, 0.2]}
            {...props}
            texture={require("../../assets/models/texture_chest.jpg")}
        />
    )
}

export default Barrel;