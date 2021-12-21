import { useState } from "react";
import { Card, TextField, Divider, Button } from '@mui/material';
import Page from '../Page/Page';
import './CreateSession.css';
import CharacterInventory from "../Character/CharacterInventory";

const CreateSession = () => {
    const [choosedClass, setChoosedClass] = useState<string>('');

    return (
        <Page className="create-session">
            <div className="card-session-container">
                <Card variant="outlined" className="card-session">

                    <div className="section info-session-section">
                        <TextField label="Game name" variant="outlined" color="secondary"/>
                        <TextField label="Initial Sparks" variant="outlined" color="secondary" />
                        <TextField label="Souls per tile" variant="outlined" color="secondary" />
                    </div>

                    <Divider>Pick a class</Divider>

                    <div className="section class-selection-section">
                        <div className="wrapper-btn">
                            <Button variant="outlined" size="large" color={choosedClass === 'knight' ? 'secondary' : 'primary'} onClick={() => setChoosedClass('knight')}>
                                Knight
                            </Button>
                            <Button variant="outlined" size="large" color={choosedClass === 'warrior' ? 'secondary' : 'primary'}  onClick={() => setChoosedClass('warrior')}>
                                Warrior
                            </Button>
                            <Button variant="outlined" size="large" color={choosedClass === 'thief' ? 'secondary' : 'primary'}  onClick={() => setChoosedClass('thief')}>
                                Thief
                            </Button>
                            <Button variant="outlined" size="large" color={choosedClass === 'herald' ? 'secondary' : 'primary'}  onClick={() => setChoosedClass('herald')}>
                                Herald
                            </Button>
                        </div>
                        <div className="wrapper-char">
                            <CharacterInventory />
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
};

export default CreateSession;