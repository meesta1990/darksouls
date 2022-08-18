import { IDoorPosition, ITile } from "../../../entities/Tile";
import "./Tile.css";
import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Door from "./Door";
import encounter_soul_lvl_1 from '../../../assets/images/souls_cards/tier_1_back.jpg';
import encounter_soul_lvl_2 from '../../../assets/images/souls_cards/tier_2_back.jpg';
import encounter_soul_lvl_3 from '../../../assets/images/souls_cards/tier_3_back.jpg';
import {Session} from "../../../entities/Session";
import {Encounter} from "../../../entities/Encounter";
import {Mob} from "../../../entities/Monster";
import {User} from "../../../entities/User";
import Nodes from "./TileFunction/Nodes";
import OpenDoorRequest from "./TileFunction/OpenDoorRequest";
import {updateSession} from "../../../services/Sessions/ServiceSession";

interface ITileComponent {
    tile: ITile;
    user?: User;
    onTileClick?: () => void;
    onDrop?: (soulsLevelID: string, tile: ITile) => void;
    mobs?: Mob[];
    focussed?: boolean;
    showNodes?: boolean;
    disableSoulsLevel?: boolean;
    isDragging?: boolean;
    encounter?: 'boss' | 'miniboss'
    animationClass?: string;
    session?: Session;
    loading?: boolean;
}

const Tile = ({
    tile,
    onTileClick,
    onDrop,
    mobs,
    focussed,
    showNodes = true,
    disableSoulsLevel = false,
    isDragging = false,
    encounter,
    session,
    user
}: ITileComponent) => {
    const tileImgRef = useRef(null);
    const [soulsLevelBack, setSoulsLevelBack] = useState<string | null>(null);
    const [animationClass, setAnimationClass] = useState('');
    const [clickedDoor, setClickedDoor] = useState<IDoorPosition>();
    let timeoutAnimation: any;

    useEffect(() => {
        if (encounter === 'miniboss') {
            decodeSoulsLevelBack(tile.minibossSoulsLevel?.soulsLevel ?? 0);
        } else if (encounter === 'boss') {
            decodeSoulsLevelBack(tile.bossSoulsLevel?.soulsLevel ?? 0);
        }
    }, [tile.minibossSoulsLevel?.soulsLevel, tile.bossSoulsLevel?.soulsLevel]);

    const handleNodeClick = () => {

    }

    const decodeSoulsLevelBack = (soulsLevel: number) => {
        setSoulsLevelBack(null);
        if(soulsLevel === 1) setSoulsLevelBack(encounter_soul_lvl_1);
        if(soulsLevel === 2) setSoulsLevelBack(encounter_soul_lvl_2);
        if(soulsLevel === 3) setSoulsLevelBack(encounter_soul_lvl_3);
    }

    const handleDrop = (e: any) => {
        let encounterSoulsLevel;

        if (encounter === 'miniboss') {
            encounterSoulsLevel = 'minibossSoulsLevel';
        } else if (encounter === 'boss') {
            encounterSoulsLevel = 'bossSoulsLevel';
        }

        if (encounterSoulsLevel) {
            tile[encounterSoulsLevel] = {};

            if (disableSoulsLevel || tile[encounterSoulsLevel].soulsLevel) {
                return;
            }

            tile[encounterSoulsLevel].soulsLevel = Number(e.dataTransfer.getData("soulsLevel") ?? 0);
            if (onDrop) {
                onDrop(e.dataTransfer.getData("soulsLevelID"), tile);
            }
        }
        e.preventDefault();
    }

    const handleAllowDrop = (e: any) => {
        e.preventDefault();
    }

    const handleTimeUpDoorRequest = () => {
        if (session) {
            session.openDoorRequest = undefined;
            updateSession(session).then(() => {
                handleChangeTile();
            });
        }
    }

    const handleDoorClick = (position: IDoorPosition) => {
        setClickedDoor(position);
        const nextTile = session?.tiles.find((t)=>t.id === position?.idNextTile);

        if(nextTile && session) {
            session.openDoorRequest = nextTile;
            updateSession(session);
        }
    }

    const handleChangeTile = () => {
        const nextTile = session?.tiles.find((t)=>t.id === clickedDoor?.idNextTile);

        if (nextTile && session) {
            setAnimationClass('fade-out');
            timeoutAnimation?.clearTimeout();
            timeoutAnimation = setTimeout(()=> {
                session.currentTile = nextTile;
                updateSession(session).then(() => {
                    setAnimationClass('fade-in');
                });
            }, 200);
        }
    }

    return (
        <div className="tile-container">
            <h3 style={{color: 'red'}}>{tile.name}</h3>

            <span className={classNames("wrapper-img-tile", animationClass)}>
                <OpenDoorRequest show={session?.openDoorRequest !== undefined} onTimeUp={handleTimeUpDoorRequest}/>

                <img
                    className={classNames("img-tile", focussed && 'focused')}
                    src={require("../../../assets/images/tiles/" + tile.id + ".jpg")}
                    onClick={onTileClick}
                    ref={tileImgRef}
                    onDrop={handleDrop}
                    onDragOver={handleAllowDrop}
                />

                {tile.id !== 0 && showNodes &&
                    <span className="nodes">
                        <Nodes tile={tile} onNodeClick={handleNodeClick} session={session} mobs={mobs} />
                    </span>
                }

                {isDragging &&
                    <span
                        className="souls-level"
                        onDrop={handleDrop}
                        onDragOver={handleAllowDrop}
                    >
                       <span className="dragging-placeholder" />
                    </span>
                }

                {soulsLevelBack &&
                    <span className="souls-level">
                       <img src={ soulsLevelBack } />
                    </span>
                }

                {tile && tile?.doors && tile?.doors?.length > 0 && session?.author.uid === user?.uid &&
                    tile?.doors.map((door) => <Door key={door.position} position={door} onDoorClick={handleDoorClick} />)
                }
            </span>
        </div>
    )
};

export default Tile;
