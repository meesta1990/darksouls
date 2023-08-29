import React, {forwardRef} from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ISentinel extends IBaseModel {

}

const Sentinel = forwardRef((props: ISentinel, ref) => {
    const model = require("../../assets/models/sentinel.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
            ref={ref}
        />
    )
});

export default Sentinel;