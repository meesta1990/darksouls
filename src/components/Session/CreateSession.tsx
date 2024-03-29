import { useState, useEffect } from 'react';
import {
    Card,
    TextField,
    Divider,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio, Avatar
} from '@mui/material';
import Page from '../Page/Page';
import './CreateSession.css';
import CharacterInventory from '../Character/CharacterInventory';
import { getBoss, getClass } from '../../services/Character/ServiceCharacter';
import { Class } from '../../entities/Class';
import { GAME_CONSTANT_MAX_SPARKS, ROUTER_HOME, ROUTER_SESSION } from '../../utils/Constants';
import { Boss } from "../../entities/Monster";
import BossSessionPage from './BossSessionPage';
import {
    createSession,
    joinSession,
    updateSession,
    getTiles,
    shuffleEncounters
} from "../../services/Sessions/ServiceSession";
import { Session } from "../../entities/Session";
import { useNavigate } from "react-router-dom";
import { User } from "../../entities/User";
import { Chat } from "../../entities/Chat";
import ClassButtons from "./ClassButtons";
import CharacterStats from "../Character/CharacterStats";
import { ITile, Tile } from "../../entities/Tile";
import ModalTileSouls from "./ModalTileSouls";
import { hashCode } from "../../utils/Functions";
import { useAppSelector } from "../../store/hooks";

const CreateSession = () => {
    const navigate = useNavigate();
    const [gameName, setGameName] = useState<string>();
    const [numberOfPLayers, setNumberOfPlayers] = useState<number>(1);
    const [passwordSession, setPasswordSession] = useState<string | null>('');
    const [avaibleTiles, setAvaibleTiles] = useState<ITile[]>([]);
    const [tilesSession, setTilesSession] = useState<ITile[]>([]);
    const [choosedClass, setChoosedClass] = useState<Class>();
    const [choosedMiniBoss, setChoosedMiniBoss] = useState<Boss>();
    const [choosedMainBoss, setChoosedMainBoss] = useState<Boss>();
    const [loading, setLoading] = useState<boolean>(false);
    const [modalTileSoulsOpened, setModalTileSoulsOpened] = useState<boolean>(false);
    const user = useAppSelector((state) => state.userReducer.user);

    useEffect(()=> {
        getTiles().then((result: any) => {
            setAvaibleTiles(result);
        })
    }, [])

    const handleBossClick = (choosedBossName: string, isMiniBoss?: boolean) => {
        getBoss(choosedBossName).then((boss) => {
            if (isMiniBoss) {
                setChoosedMiniBoss(boss);
            } else {
                setChoosedMainBoss(boss);
            }
        });
    }

    const handleRadioPlayersChange = (e: any) => {
        setNumberOfPlayers(Number(e.target.value));
    }

    const handlePasswordSessionChange = (e: any) => {
        const psw = e.target.value;

        if (psw.trim() === ''){
            setPasswordSession(null);
        } else {
            setPasswordSession(psw);
        }
    }

    const handleGoBackClick = () => {
        navigate(ROUTER_HOME);
    }

    const handleCreateSessionClick = () => {
        const session = new Session();

        session.creation_date = new Date().getTime();
        session.last_update = new Date().getTime();
        session.sparks_left = GAME_CONSTANT_MAX_SPARKS - numberOfPLayers;
        session.author = user;
        session.started = false;

        //set the correct path:
        if(tilesSession){
            const bonfire = tilesSession.find((t: ITile) => t.id === 0);
            const tile_miniboss = tilesSession.find((t: ITile) => t.id === 1);
            const tile_boss = tilesSession.find((t: ITile) => t.id === 2);
            const tile_3 = tilesSession.find((t: ITile) => t.id === 3);
            const tile_6 = tilesSession.find((t: ITile) => t.id === 6);
            const tile_7 = tilesSession.find((t: ITile) => t.id === 7);
            const tile_8 = tilesSession.find((t: ITile) => t.id === 8);

            if(tile_miniboss?.doors){
                tile_miniboss.doors[0].idNextTile = 8;
            }
            if(bonfire?.doors){
                bonfire.doors[0].idNextTile = 3;
                bonfire.doors[1].idNextTile = 6;
            }
            if(tile_3?.doors){
                tile_3.doors[0].idNextTile = 0;
                tile_3.doors[1].idNextTile = 7;
            }
            if(tile_6?.doors){
                tile_6.doors[0].idNextTile = 0;
                tile_6.doors[1].idNextTile = 7;
            }
            if(tile_7?.doors){
                tile_7.doors[0].idNextTile = 3;
                tile_7.doors[1].idNextTile = 6;
                tile_7.doors[2].idNextTile = 8;
            }
            if(tile_8?.doors){
                tile_8.doors[0].idNextTile = 1;
                tile_8.doors[1].idNextTile = 7;
            }
        }

        session.tiles = tilesSession;
        session.currentTile = tilesSession[0];
        session.miniboss_defeated = false;

        if (passwordSession) {
            session.password = passwordSession;
        }

        if (gameName) {
            session.name = gameName;
        }

        if (choosedClass) {
            console.log('asd',choosedClass)
            const players = new Array(numberOfPLayers);
            choosedClass.owner = user;
            choosedClass.id = 'class_' + hashCode(choosedClass.name);
            players[0] = choosedClass;

            session.players = {
                max_players: numberOfPLayers,
                players: []
            };
        }
        if (choosedMainBoss) {
            session.main_boss = choosedMainBoss;
        }
        if (choosedMiniBoss) {
            session.mini_boss = choosedMiniBoss;
        }
        session.souls = 0;

        //shuffle encounters:
        shuffleEncounters(session).then(()=> {
            setLoading(true);
            createSession(session).then((session: any) => {
                session.chat = new Chat({
                    sessionID: session.id
                });

                updateSession(session).then(() => {
                    joinSession(session, user, choosedClass!).then(()=> {
                        navigate(ROUTER_SESSION + '/' + session.id);
                    })
                }).finally(() => {
                    setLoading(false);
                })
            })
        });
    }

    const handleSoulsChoosed = (_t: ITile[]) => {
        setTilesSession(_t);
        setModalTileSoulsOpened(false);
    }

    return (
        <Page className="create-session" loading={loading}>
            {
                choosedMiniBoss && choosedMainBoss &&
                    <ModalTileSouls
                        open={modalTileSoulsOpened}
                        minibossSouls={choosedMiniBoss.soul_cards}
                        bossSouls={choosedMainBoss.soul_cards}
                        avaibleTiles={avaibleTiles}
                        handleClose={()=> setModalTileSoulsOpened(false) }
                        onSave={handleSoulsChoosed}
                    />
            }

            <div className="card-session-container">
                <Card variant="outlined" className="card-session">

                    <div className="section info-session-section">
                        <TextField label="Game name" variant="outlined" color="secondary"
                                   onChange={(e: any) => setGameName(e.target.value)} />

                        <FormControl component="fieldset">
                            <FormLabel component="legend" color="secondary">Number of players</FormLabel>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                <FormControlLabel value={1} control={<Radio color="secondary" />} color="secondary" label="1" checked={numberOfPLayers === 1} onChange={handleRadioPlayersChange} />
                                <FormControlLabel value={2} control={<Radio color="secondary" />} color="secondary" label="2" checked={numberOfPLayers === 2} onChange={handleRadioPlayersChange} />
                                <FormControlLabel value={3} control={<Radio color="secondary" />} color="secondary" label="3" checked={numberOfPLayers === 3} onChange={handleRadioPlayersChange} />
                                <FormControlLabel value={4} control={<Radio color="secondary" />} color="secondary" label="4" checked={numberOfPLayers === 4} onChange={handleRadioPlayersChange} />
                            </RadioGroup>
                        </FormControl>

                        <TextField label="Initial Sparks" variant="outlined" color="secondary" className="half-column" InputProps={{
                            readOnly: true,
                            value: GAME_CONSTANT_MAX_SPARKS - numberOfPLayers
                        }} />

                        <TextField label="Souls per tile" variant="outlined" color="secondary" className="half-column" InputProps={{
                            readOnly: true,
                            value: 4
                        }} />

                        <TextField label="Password" variant="outlined" color="secondary" className="half-column" onChange={handlePasswordSessionChange}/>
                    </div>

                    <Divider>Pick a class</Divider>

                    <div className="section class-selection-section">
                        <ClassButtons onClassChoosed={setChoosedClass}/>

                        <div className="wrapper-char">
                            <CharacterInventory choosedClass={choosedClass}/>
                            <CharacterStats choosedClass={choosedClass}/>
                        </div>
                    </div>

                    <Divider>Pick a mini boss</Divider>

                    <div className="section class-selection-section boss">
                        <div className="wrapper-btn-bosses">
                            <Button variant="outlined" size="large" color={choosedMiniBoss?.name === 'boreal_outider_knight' ? 'secondary' : 'primary'} onClick={() => handleBossClick('boreal_outider_knight', true)}>
                                Boreal Outrider Knight
                            </Button>
                            <Button variant="outlined" size="large" color={choosedMiniBoss?.name === 'gargoyle' ? 'secondary' : 'primary'}  onClick={() => handleBossClick('gargoyle', true)}>
                                Gargoyle
                            </Button>
                            <Button variant="outlined" size="large" color={choosedMiniBoss?.name === 'titanite_demon' ? 'secondary' : 'primary'}  onClick={() => handleBossClick('titanite_demon', true)}>
                                Titanite Demon
                            </Button>
                            <Button variant="outlined" size="large" color={choosedMiniBoss?.name === 'winged_knight' ? 'secondary' : 'primary'}  onClick={() => handleBossClick('winged_knight', true)}>
                                Winged Knight
                            </Button>
                        </div>
                        <div className="wrapper-boss">
                            {choosedMiniBoss && <BossSessionPage boss={choosedMiniBoss} />}
                        </div>
                    </div>

                    <Divider>Pick a main boss</Divider>

                    <div className="section class-selection-section boss">
                        <div className="wrapper-btn-bosses">
                            <Button
                                variant="outlined"
                                size="large"
                                color={choosedMainBoss?.name === 'dancer_of_the_boreal_valley' ? 'secondary' : 'primary'}
                                onClick={() => handleBossClick('dancer_of_the_boreal_valley')}
                            >
                                Dancer of the Boreal Valley
                            </Button>
                        </div>
                        <div className="wrapper-boss">
                            {choosedMainBoss && <BossSessionPage boss={choosedMainBoss} />}
                        </div>
                    </div>

                    <Divider>Set tile's level</Divider>

                    <div className="section class-selection-section boss">
                        <div className="wrapper-btn-bosses">
                            <Button
                                variant="outlined"
                                size="large"
                                color="secondary"
                                onClick={() => setModalTileSoulsOpened(true) }
                                disabled={!choosedMiniBoss || !choosedMainBoss}
                            >
                                Set souls
                            </Button>
                        </div>
                    </div>


                    <div className="footer">
                        <Button className="back-button" variant="contained" size="large" color="primary" onClick={handleGoBackClick}>
                            Go back
                        </Button>

                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            onClick={handleCreateSessionClick}
                            disabled={!gameName || !choosedClass || !choosedMiniBoss || !choosedMainBoss || tilesSession.length === 0}
                        >
                            Create
                        </Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
};

export default CreateSession;
