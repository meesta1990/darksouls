import React, {forwardRef} from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IAssassin extends IBaseModel {

}

const Assassin = forwardRef((props: IBaseModel, ref) => {
    const model = require("../../assets/models/assasin.obj");

    return (
        <BaseModel
            scale={[0.15, 0.15, 0.15]}
            model={model}
            ref={ref}
            {...props}
        />
    )
});

export default Assassin;