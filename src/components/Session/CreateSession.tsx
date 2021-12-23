import { useState } from "react";
import { Card, TextField, Divider, Button } from '@mui/material';
import Page from '../Page/Page';
import './CreateSession.css';
import CharacterInventory from '../Character/CharacterInventory';
import { getClass } from '../../services/Character/ServiceCharacter';
import { Class } from '../../entities/Class';

const CreateSession = () => {
    const [choosedClass, setChoosedClass] = useState<Class|undefined>();

    const handleClassClick = (choosedClass: string) => {
        getClass(choosedClass).then((_class) => {
            setChoosedClass(_class);
        });
    }

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
                            <Button variant="outlined" size="large" color={choosedClass?.name === 'knight' ? 'secondary' : 'primary'} onClick={() => handleClassClick('knight')}>
                                Knight
                            </Button>
                            <Button variant="outlined" size="large" color={choosedClass?.name === 'warrior' ? 'secondary' : 'primary'}  onClick={() => handleClassClick('warrior')}>
                                Warrior
                            </Button>
                            <Button variant="outlined" size="large" color={choosedClass?.name === 'thief' ? 'secondary' : 'primary'}  onClick={() => handleClassClick('thief')}>
                                Thief
                            </Button>
                            <Button variant="outlined" size="large" color={choosedClass?.name === 'herald' ? 'secondary' : 'primary'}  onClick={() => handleClassClick('herald')}>
                                Herald
                            </Button>
                        </div>
                        <div className="wrapper-char">
                            <CharacterInventory choosedClass={choosedClass}/>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
};

export default CreateSession;