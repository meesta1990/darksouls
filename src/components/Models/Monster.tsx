import React from 'react'
import BaseModel, { IBaseModel } from "./BaseModel";

interface IMonster extends IBaseModel {

}

const Monster = (props: IMonster) => {
    return (
        <BaseModel
            {...props}
        />
    )
}

export default Monster;