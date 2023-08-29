import React, {forwardRef} from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IHerald extends IBaseModel {

}

const Herald = forwardRef((props: IHerald, ref) => {
    const model = require("../../assets/models/herald.obj");

    return (
        <BaseModel
            ref={ref}
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
});

export default Herald;