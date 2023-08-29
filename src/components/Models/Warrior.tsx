import React, {forwardRef} from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IWarrior extends IBaseModel {

}

const Warrior = forwardRef((props: IWarrior, ref) => {
    const model = require("../../assets/models/warrior.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
            ref={ref}
        />
    )
});

export default Warrior;