import React, {forwardRef} from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ILargeHollow extends IBaseModel {

}

const LargeHollow = forwardRef((props: ILargeHollow, ref) => {
    const model = require("../../assets/models/large_hollow_2.obj");

    return (
        <BaseModel
            model={model}
            ref={ref}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
});

export default LargeHollow;