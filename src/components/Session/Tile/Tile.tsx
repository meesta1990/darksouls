import { ITile } from "../../../entities/Tile";
import "./Tile.css";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Door from "./Door";
import encounter_soul_lvl_1 from '../../../assets/images/souls_cards/tier_1_back.jpg';
import encounter_soul_lvl_2 from '../../../assets/images/souls_cards/tier_2_back.jpg';
import encounter_soul_lvl_3 from '../../../assets/images/souls_cards/tier_3_back.jpg';

interface ITileComponent {
    tile: ITile;
    onTileClick?: () => void;
    onDrop?: (soulsLevelID: string, tile: ITile) => void;
    focussed?: boolean;
    showNodes?: boolean;
    disableSoulsLevel?: boolean;
    isDragging?: boolean;
    encounter?: 'boss' | 'miniboss'
}

const Tile = ({
    tile,
    onTileClick,
    onDrop,
    focussed,
    showNodes = false,
    disableSoulsLevel = false,
    isDragging = false,
    encounter
}: ITileComponent) => {
    const tileImgRef = useRef(null);
    const [soulsLevelBack, setSoulsLevelBack] = useState<string | null>(null);

    useEffect(() => {
        if (encounter === 'miniboss') {
            decodeSoulsLevelBack(tile.minibossSoulsLevel?.soulsLevel ?? 0);
        } else if (encounter === 'boss') {
            decodeSoulsLevelBack(tile.bossSoulsLevel?.soulsLevel ?? 0);
        }
    }, [tile.minibossSoulsLevel?.soulsLevel, tile.bossSoulsLevel?.soulsLevel]);

    const handleNodeClick = (el: any) => {
        console.log('asd', el);
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

    let count_draw_node = 0;
    const setNodes = (row: number) => {
        const nodes = [];

        for (let i=0;i<5;i++) {
            const drawNode = (row % 2 !== 0 && i % 2 === 0) || (row % 2 === 0 && i % 2 !== 0);
            const nodeOptionalParams: any = {};

            if(drawNode) {
                count_draw_node++;
                nodeOptionalParams.id = 'node_' + count_draw_node;
                nodeOptionalParams.className = 'node';
                nodeOptionalParams.onClick = handleNodeClick;
            }

            nodes.push(
                <span
                    key={'node_' + row + '_' +i}
                    className="wrapper-node"
                >
                    <span
                        {...nodeOptionalParams}
                    >
                        &nbsp;
                    </span>
                </span>
            )
        }
        return nodes
    }

    return (
        <div className="tile-container">
            <span className="wrapper-img-tile">
                <img
                    className={classNames("img-tile", focussed && 'focused')}
                    src={require("../../../assets/images/tiles/" + tile.id + ".jpg")}
                    onClick={onTileClick}
                    ref={tileImgRef}
                    onDrop={handleDrop}
                    onDragOver={handleAllowDrop}
                />


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

                {tile && tile?.doors && tile?.doors?.length > 0 &&
                    tile?.doors.map((door) => <Door key={door.position} position={door} />)
                }
            </span>

            {tile.id !== 0 && showNodes &&
                <span className="nodes">
                    {[...Array(5)].map((x, i) =>
                        <span key={i} className={"row-nodes row-" + (i+1)}>
                            {setNodes(i+1)}
                        </span>
                    )}
                </span>
            }
        </div>
    )
};

export default Tile;
