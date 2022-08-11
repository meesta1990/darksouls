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
}

const Door = ({ position }: IDoor) => {
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

    return <>
        <IconButton aria-label="delete" className={classNames(position.position, 'door')}>
            { getDoor(position.position) }
        </IconButton>
    </>
}

export default Door;
