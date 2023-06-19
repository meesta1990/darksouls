import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IAnvil extends IBaseModel {

}

const Anvil = (props: IAnvil) => {
    const model = require("../../assets/models/anvil.obj");

    return (
        <BaseModel
            model={model}
            {...props}
            texture={require("../../assets/models/texture_anvil.jpg")}
        />
    )
}

export default Anvil;