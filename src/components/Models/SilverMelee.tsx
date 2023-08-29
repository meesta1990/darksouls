import React, {forwardRef, useEffect} from 'react'
import BaseModel, {IBaseModel} from "./BaseModel";

interface ISilverMelee extends IBaseModel {

}

const SilverMelee = forwardRef((props: ISilverMelee, ref) => {
    const model = require("../../assets/models/silver_melee.obj");

    useEffect(() => {
        console.log('test',ref, props)
    }, [])

    return (
        <BaseModel
            model={model}
            ref={ref}
            scale={[0.15, 0.15, 0.15]}
            {...props}
        />
    )
});

export default SilverMelee;