import React from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IWarrior extends IBaseModel {

}

const Warrior = (props: IWarrior) => {
    const model = require("../../assets/models/warrior.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
}

export default Warrior;