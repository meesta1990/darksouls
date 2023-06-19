import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IHollowMelee extends IBaseModel {

}

const HollowMelee = (props: IBaseModel) => {
    const model = require("../../assets/models/hollow_ranged.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.12, 0.12, 0.12]}
            {...props}
        />
    )
}

export default HollowMelee;