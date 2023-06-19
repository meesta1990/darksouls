import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IHollowMelee extends IBaseModel {

}

const HollowMelee = ( props: IHollowMelee ) => {
    const model = require("../../assets/models/hollow_melee.obj");

    return (
        <BaseModel
            scale={[0.12, 0.12, 0.12]}
            model={model}
            {...props}
        />
    )
}

export default HollowMelee;