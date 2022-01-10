import { useState } from 'react';
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
import { GAME_CONSTANT_MAX_SPARKS, ROUTER_HOME } from '../../utils/Constants';
import { Boss } from "../../entities/Monster";
import BossSessionPage from './BossSessionPage';
import {createSession, updateSession} from "../../services/Sessions/ServiceSession";
import { Session } from "../../entities/Session";
import { useNavigate } from "react-router-dom";
import { User } from "../../entities/User";
import {Chat} from "../../entities/Chat";
import ClassButtons from "./ClassButtons";

interface ICreateSession {
    user: User;
}

const CreateSession = ({ user }: ICreateSession) => {
    const navigate = useNavigate();
    const [gameName, setGameName] = useState<string>();
    const [numberOfPLayers, setNumberOfPlayers] = useState<number>(1);
    const [passwordSession, setPasswordSession] = useState<string | null>('');
    const [choosedClass, setChoosedClass] = useState<Class>();
    const [choosedMiniBoss, setChoosedMiniBoss] = useState<Boss>();
    const [choosedMainBoss, setChoosedMainBoss] = useState<Boss>();
    const [loading, setLoading] = useState<boolean>(false);

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

        if (passwordSession) {
            session.password = passwordSession;
        }

        if (gameName) {
            session.name = gameName;
        }

        if (choosedClass) {
            const players = new Array(numberOfPLayers);
            choosedClass.owner = user;
            players[0] = choosedClass;

            session.players = {
                max_players: numberOfPLayers,
                players: players
            };
        }
        if (choosedMainBoss) {
            session.main_boss = choosedMainBoss;
        }
        if (choosedMiniBoss) {
            session.mini_boss = choosedMiniBoss;
        }

        setLoading(true);
        createSession(session).then((session: any) => {
            session.chat = new Chat({
                sessionID: session.id
            });

            updateSession(session).finally(() => {
                setLoading(false);
            })
        })
    }

    return (
        <Page className="create-session" loading={loading}>
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
                            <Button variant="outlined" size="large" color={choosedMainBoss?.name === 'dancer_of_the_boreal_valley' ? 'secondary' : 'primary'} onClick={() => handleBossClick('dancer_of_the_boreal_valley')}>
                                Dancer of the Boreal Valley
                            </Button>
                        </div>
                        <div className="wrapper-boss">
                            {choosedMainBoss && <BossSessionPage boss={choosedMainBoss} />}
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
                            disabled={!gameName || !choosedClass || !choosedMiniBoss || !choosedMainBoss}
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
