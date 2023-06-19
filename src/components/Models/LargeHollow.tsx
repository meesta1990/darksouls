import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ILargeHollow extends IBaseModel {

}

const LargeHollow = (props: ILargeHollow) => {
    const model = require("../../assets/models/large_hollow.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
}

export default LargeHollow;