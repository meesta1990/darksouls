import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ISilverRanged extends IBaseModel {

}

const SilverRanged = (props: ISilverRanged) => {
    const model = require("../../assets/models/silver_ranged.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
}

export default SilverRanged;