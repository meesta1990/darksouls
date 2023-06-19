import React from 'react'
import BaseModel, { IBaseModel } from "./BaseModel";
import {ITile} from "../../entities/Tile";

interface IDoor extends IBaseModel {
    onDoorClicked:(nextTile: ITile) => void;
}
const Door = (props: IDoor) => {
    const model = require("../../assets/models/door.obj");

    return (
        <BaseModel
            model={model}
            {...props}
        />
    )
}

export default Door;