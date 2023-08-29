import React, {forwardRef} from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface IKnight extends IBaseModel {

}

const Knight = forwardRef((props: IKnight, ref) => {
    const model = require("../../assets/models/knight.obj");

    return (
        <BaseModel
            model={model}
            scale={[0.15, 0.15, 0.15]}
            {...props}
            ref={ref}
        />
    )
});

export default Knight;