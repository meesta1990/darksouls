import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IAssassin extends IBaseModel {

}

const Assassin = (props: IAssassin) => {
    const model = require("../../assets/models/assasin.obj");

    return (
        <BaseModel
            model={model}
            {...props}
        />
    )
}

export default Assassin;