import { IDoorPosition, ITile } from "../../../entities/Tile";
import "./Tile.css";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Door from "./Door";
import encounter_soul_lvl_1 from '../../../assets/images/souls_cards/tier_1_back.jpg';
import encounter_soul_lvl_2 from '../../../assets/images/souls_cards/tier_2_back.jpg';
import encounter_soul_lvl_3 from '../../../assets/images/souls_cards/tier_3_back.jpg';
import {Session} from "../../../entities/Session";
import {Encounter} from "../../../entities/Encounter";
import {Mob} from "../../../entities/Monster";
import Loader from "../../Common/Loader";

interface ITileComponent {
    tile: ITile;
    onTileClick?: () => void;
    onDrop?: (soulsLevelID: string, tile: ITile) => void;
    mobs?: Mob[];
    focussed?: boolean;
    showNodes?: boolean;
    disableSoulsLevel?: boolean;
    isDragging?: boolean;
    onDoorClick?(position: IDoorPosition): void;
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
    onDoorClick,
    encounter,
    animationClass,
    session,
    loading = false
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
        let mobSelector = null;
        let mobsInTheTile = null;
        const positionRedSword = tile.special_nodes.find((sp) => sp.id === 'red_sword')
        const positionRedCross = tile.special_nodes.find((sp) => sp.id === 'red_cross')
        const positionPurpleStar = tile.special_nodes.find((sp) => sp.id === 'purple_star')
        const positionPurpleTree = tile.special_nodes.find((sp) => sp.id === 'purple_tree')


        if (session) {
            mobSelector = session?.miniboss_defeated ? 'bossSoulsLevel' : 'minibossSoulsLevel';
            mobsInTheTile = tile[mobSelector];
        }

        for (let i=0;i<5;i++) {
            const drawNode = (row % 2 !== 0 && i % 2 === 0) || (row % 2 === 0 && i % 2 !== 0);
            const nodeOptionalParams: any = {};

            if(drawNode) {
                count_draw_node++;
                nodeOptionalParams.id = 'node_' + count_draw_node;
                nodeOptionalParams.className = 'node';
                nodeOptionalParams.onClick = handleNodeClick;

                if (count_draw_node-1 === positionRedSword?.position) {
                    nodeOptionalParams.special_nodes = positionRedSword.id;
                    nodeOptionalParams.creatures = mobsInTheTile.encounter[positionRedSword.id]
                }
                if (count_draw_node-1 === positionRedCross?.position) {
                    nodeOptionalParams.special_nodes = positionRedCross.id;
                    nodeOptionalParams.creatures = mobsInTheTile.encounter[positionRedCross.id]
                }
                if (count_draw_node-1 === positionPurpleStar?.position) {
                    nodeOptionalParams.special_nodes = positionPurpleStar.id;
                    nodeOptionalParams.creatures = mobsInTheTile.encounter[positionPurpleStar.id]
                }
                if (count_draw_node-1 === positionPurpleTree?.position) {
                    nodeOptionalParams.special_nodes = positionPurpleTree.id;
                    nodeOptionalParams.creatures = mobsInTheTile.encounter[positionPurpleTree.id]
                }
            }

            if (nodeOptionalParams.creatures) {
                for (let i=0;i<nodeOptionalParams.creatures.length;i++) {
                    const mob = mobs?.find((_m)=>_m.id == nodeOptionalParams.creatures[i].id_mob);

                    if(mob){
                        nodeOptionalParams.creatures[i] = mob;
                    }
                }
            }

            nodes.push(
                <span
                    key={'node_' + row + '_' +i}
                    className="wrapper-node"
                >
                    <span
                        {...nodeOptionalParams}
                    >
                        {nodeOptionalParams.creatures?.map((_creature: any, index: number)=>
                            <span className="creature-icon" key={'creature_' + row + '_' +i + '_' + _creature.id + index}>
                                <img src={_creature.src_icon} />
                            </span>
                        )}
                        &nbsp;
                    </span>
                </span>
            )
        }
        return nodes
    }

    return (
        <div className="tile-container">
            <span className={classNames("wrapper-img-tile", animationClass)}>
                <Loader loading={loading} />

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
                    {[...Array(5)].map((x, i) =>
                        <span key={i} className={"row-nodes row-" + (i+1)}>
                            {setNodes(i+1)}
                        </span>
                    )}
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

                {tile && tile?.doors && tile?.doors?.length > 0 &&
                    tile?.doors.map((door) => <Door key={door.position} position={door} onDoorClick={onDoorClick} />)
                }
            </span>

            <h3 style={{color: 'red'}}>{tile.name}</h3>
        </div>
    )
};

export default Tile;
