import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IFireKeeper extends IBaseModel {

}
const FireKeeper = (props: IFireKeeper) => {
    const model = require("../../assets/models/firekeeper.obj");

    return (
        <BaseModel
            model={model}
            {...FireKeeper}
        />
    )
}

export default FireKeeper;