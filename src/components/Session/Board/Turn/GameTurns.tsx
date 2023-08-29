import { useEffect, useState } from "react";
import classNames from "classnames";
import { ITile } from "../../../../entities/Tile";
import './GameTurns.css'
import { getMonstersInTile } from "../../../../utils/Functions";
import { Mob } from "../../../../entities/Monster";
import { Class } from "../../../../entities/Class";
import {Encounter} from "../../../../entities/Encounter";
import {Avatar} from "@mui/material";

interface ITurn {
    currentTile: ITile;
}

const GameTurns = ({ currentTile }: ITurn) => {
    const [order, setOrder] = useState<Mob[] | Class[]>(currentTile.queueOrder ?? []);
    const [over, setOver] = useState(false);
    const [srcCard, setSrcCard] = useState<string>('');

    useEffect(() => {
        setOrder(currentTile.queueOrder ?? []);
    }, [currentTile]);

    const handleMouseEnter = (entity: Mob | Class) => {
        setOver(true)
        setSrcCard(entity.type === 'Monster' ? (entity as Mob).src : (entity as Class).src_board);
    }

    const handleMouseLeave = () => {
        setOver(false)
    }

    return (
        <div className="wrapper-turn">
            <div className="turn">
                {order.map((entity, index)=>
                    <span
                        key={"turn_" + entity.id + '_' + index}
                        className="monster"
                        onMouseEnter={() => handleMouseEnter(entity)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {
                            entity.type === 'Monster' ?
                                <img
                                    className={entity.id === (currentTile.turn.entity as Mob).id ? 'current' : ''}
                                    src={(entity as Mob).src_icon}/>
                            :
                                <Avatar
                                    className={entity.id === (currentTile.turn.entity as Class).id ? 'current' : ''}
                                    src={(entity as Class).profile_photo}/>
                        }
                    </span>
                )}
            </div>

            <div
                className={classNames("card", over ? 'show' : 'hide')}
                style={{ transform: `translateX(${70 * (order.length-1)}px)` }}
            >
                <img src={srcCard} />
            </div>
        </div>
    )
}

export default GameTurns;