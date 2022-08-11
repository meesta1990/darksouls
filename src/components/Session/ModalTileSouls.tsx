import "./ModalTileSouls.css";
import Modal from '@mui/material/Modal';
import {Boss, ISoulsCards} from "../../entities/Monster";
import { ITile } from "../../entities/Tile";
import Tile from "./Tile/Tile";
import {createRef, useEffect, useState} from "react";
import { Button } from "@mui/material";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SoulCardSession from "./SoulCardSession";

interface IModalTileSouls {
    open: boolean;
    handleClose: () => void;
    onSave: (avaibleTiles: ITile[]) => void;
    avaibleTiles: ITile[];
    minibossSouls: ISoulsCards;
    bossSouls: ISoulsCards;
}

const ModalTileSouls = ({
    open,
    handleClose,
    onSave,
    avaibleTiles,
    minibossSouls,
    bossSouls
}: IModalTileSouls) => {
    const slider: any = createRef();
    const [encounter, setEncounter] = useState<'miniboss' | 'boss'>('miniboss');
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [internalAvaibleTiles, setInternalAvaibleTiles] = useState<ITile[]>(avaibleTiles);
    const [usedSoulsLevel, setUsedSoulsLevel] = useState<string[]>([]);
    const [usedTiles, setUsedTiles] = useState<ITile[]>([]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleChangePhase = () => {
        slider.current.slickNext()
        setEncounter(encounter === 'miniboss' ? 'boss' : 'miniboss');
    }

    const handleReset = () => {
        for (let i=0; i<internalAvaibleTiles.length; i++) {
            if (encounter === 'miniboss') {
                internalAvaibleTiles[i].minibossSoulsLevel = undefined;

                if (usedTiles[i]) {
                    usedTiles[i].minibossSoulsLevel = undefined;
                }
            } else if (encounter === 'boss'){
                internalAvaibleTiles[i].bossSoulsLevel = undefined;

                if (usedTiles[i]) {
                    usedTiles[i].bossSoulsLevel = undefined;
                }
            }
            setInternalAvaibleTiles([...internalAvaibleTiles]);
        }
        const tmp = usedSoulsLevel.filter(function (item) {
            return !item.startsWith(encounter);
        });
        setUsedSoulsLevel([...tmp]);
    }

    const handleSave = () => {
        onSave([avaibleTiles[0], avaibleTiles[1], avaibleTiles[2], ...usedTiles]);
    }

    const handleDragStart = (e: any, soulLevel: number, soulsLevelID: string) => {
        e.dataTransfer.setData("soulsLevel", soulLevel);
        e.dataTransfer.setData("soulsLevelID", soulsLevelID);
        setIsDragging(true);
    }

    const handleDragEnd = () => {
        setIsDragging(false);
    }

    const handleDrop = (soulsLevelID: string, tile: ITile) => {
        setIsDragging(false);
        const exists = usedSoulsLevel?.find(element => element === soulsLevelID);
        const existsUsedTiles = usedTiles?.find(element => element.id === tile.id);

        if(!exists) {
            usedSoulsLevel.push(soulsLevelID);
            setUsedSoulsLevel([...usedSoulsLevel]);

            if (!existsUsedTiles) {
                usedTiles.push(tile);
            }
            setUsedTiles([...usedTiles]);

            const indexTileToUpdate = internalAvaibleTiles.findIndex((_tile) => {
                return _tile.id === tile.id
            });
            internalAvaibleTiles[indexTileToUpdate] = tile;
            setInternalAvaibleTiles([...internalAvaibleTiles]);
        }
    }

    const getTiles = (encounter: 'boss' | 'miniboss') => {
        return (
            <div className="map-tiles-encounter">
                <div className="map-tiles">
                    <div className="map-tiles-row">
                        <Tile encounter={encounter} tile={internalAvaibleTiles[0]} disableSoulsLevel onDrop={handleDrop} />
                        <Tile encounter={encounter} tile={internalAvaibleTiles[3]} isDragging={isDragging} onDrop={handleDrop} />
                        <div className="tile-container"/>
                    </div>
                    <div className="map-tiles-row">
                        <Tile encounter={encounter} tile={internalAvaibleTiles[6]} isDragging={isDragging} onDrop={handleDrop} />
                        <Tile encounter={encounter} tile={internalAvaibleTiles[7]} isDragging={isDragging} onDrop={handleDrop} />
                        <Tile encounter={encounter} tile={internalAvaibleTiles[8]} isDragging={isDragging} onDrop={handleDrop} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="wrapper-map-tiles">
                <div className="map-tiles-encounter">
                    <div className="first-column">
                        <h1>{encounter} Phase</h1>

                        <Button
                            variant="outlined"
                            color={'secondary'}
                            onClick={handleChangePhase}
                        >
                            Change Phase
                        </Button>

                        <p className="description">
                            Drag the soul card in the tile you want
                        </p>

                        <span className="wrapper-img-soul">
                            <SoulCardSession
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                encounter={encounter}
                                usedSoulsLevel={usedSoulsLevel}
                                soul_cards={encounter === 'miniboss' ? minibossSouls : bossSouls}
                            />
                        </span>

                        <Button
                            variant="outlined"
                            color={'secondary'}
                            className="btn-reset"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>

                        <Button
                            variant="outlined"
                            disabled={usedSoulsLevel.length !== 8}
                            color={'primary'}
                            className="btn-save"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>

                    <div className="second-column">
                        <Slider {...settings} ref={slider}>
                            {getTiles('miniboss')}
                            {getTiles('boss')}
                        </Slider>
                    </div>
                </div>

            </div>
        </Modal>
    );
}

export default ModalTileSouls;
