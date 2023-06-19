import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IKnight extends IBaseModel {

}

const Knight = (props: IKnight) => {
    const model = require("../../assets/models/knight.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
}

export default Knight;