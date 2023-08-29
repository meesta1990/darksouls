import React, {forwardRef} from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IHollowRanged extends IBaseModel {

}

const HollowRanged = forwardRef((props: IHollowRanged, ref) => {
    const model = require("../../assets/models/hollow_ranged.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.12, 0.12, 0.12]}
            {...props}
            ref={ref}
        />
    )
});

export default HollowRanged;