import React from 'react'
import BaseModel, { IBaseModel } from "./BaseModel";

interface ITomb extends IBaseModel {
}
const Tomb = (props: ITomb) => {
    const model = require("../../assets/models/tomb.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.4, 0.4, 0.4]}
            {...props}
        />
    )
}

export default Tomb;