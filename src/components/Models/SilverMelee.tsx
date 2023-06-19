import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ISilverMelee extends IBaseModel {

}

const SilverMelee = (props: ISilverMelee) => {
    const model = require("../../assets/models/silver_melee.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
}

export default SilverMelee;