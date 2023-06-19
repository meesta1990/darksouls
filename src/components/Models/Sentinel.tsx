import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ISentinel extends IBaseModel {

}

const Sentinel = (props: ISentinel) => {
    const model = require("../../assets/models/sentinel.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
}

export default Sentinel;