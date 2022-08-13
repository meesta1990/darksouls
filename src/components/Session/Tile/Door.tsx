import { IDoorPosition } from "../../../entities/Tile";
import "./Door.css";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ReactNode } from "react";
import classNames from "classnames";

interface IDoor {
    position: IDoorPosition;
    onDoorClick?(position: IDoorPosition): void;
}

const Door = ({ position, onDoorClick }: IDoor) => {
    console.log(position)
    const getDoor = (position: string): ReactNode => {
        switch(position) {
            case 'right':
                return <ArrowRightIcon fontSize="large"/>;
            case 'left':
                return <ArrowLeftIcon />;
            case 'top':
                return <ArrowDropUpIcon />;
            case 'bottom':
                return <ArrowDropDownIcon />;
        }
    }

    const handleOnDoorClick = () => {
        if(onDoorClick){
            onDoorClick(position);
        }
    }

    return <>
        <IconButton aria-label="delete" className={classNames(position.position, 'door')} onClick={handleOnDoorClick} >
            { getDoor(position.position) }
        </IconButton>
    </>
}

export default Door;
