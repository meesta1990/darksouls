import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IHerald extends IBaseModel {

}

const Herald = (props: IHerald) => {
    const model = require("../../assets/models/herald.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
}

export default Herald;