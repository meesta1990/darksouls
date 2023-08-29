import React, {forwardRef} from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ISilverRanged extends IBaseModel {

}

const SilverRanged = forwardRef((props: ISilverRanged, ref) => {
    const model = require("../../assets/models/silver_ranged.obj");

    return (
        <BaseModel
            model={model}
            ref={ref}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
});

export default SilverRanged;