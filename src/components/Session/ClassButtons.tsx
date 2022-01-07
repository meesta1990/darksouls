import { Button } from "@mui/material";
import { useState } from "react";
import { Class } from "../../entities/Class";
import { getClass } from "../../services/Character/ServiceCharacter";


interface IClassButtons {
    onClassChoosed: any;
    excludedClasses?: string[];
}

const ClassButtons = ({
    onClassChoosed,
    excludedClasses = []
}: IClassButtons) => {
    const [choosedClass, setChoosedClass] = useState<Class>();

    const handleClassClick = (choosedClassName: string) => {
        getClass(choosedClassName).then((_class) => {
            setChoosedClass(_class);
            onClassChoosed(_class);
        });
    }

    return (
        <div className="class-selection-section">
            <div className="wrapper-btn">
                <Button variant="outlined"
                        className={excludedClasses.find((excludedClass) => excludedClass === 'knight') && 'disabled'}
                        size="large" color={choosedClass?.name === 'knight' ? 'secondary' : 'primary'} onClick={() => handleClassClick('knight')}>
                    Knight
                </Button>
                <Button variant="outlined"
                        className={excludedClasses.find((excludedClass) => excludedClass === 'warrior') && 'disabled'}
                        size="large" color={choosedClass?.name === 'warrior' ? 'secondary' : 'primary'}  onClick={() => handleClassClick('warrior')}>
                    Warrior
                </Button>
                <Button variant="outlined"
                        className={excludedClasses.find((excludedClass) => excludedClass === 'assassin') && 'disabled'}
                        size="large" color={choosedClass?.name === 'assassin' ? 'secondary' : 'primary'}  onClick={() => handleClassClick('assassin')}>
                    Assassin
                </Button>
                <Button variant="outlined"
                        className={excludedClasses.find((excludedClass) => excludedClass === 'herald') && 'disabled'}
                        size="large" color={choosedClass?.name === 'herald' ? 'secondary' : 'primary'}  onClick={() => handleClassClick('herald')}>
                    Herald
                </Button>
            </div>
        </div>
    );
}

export default ClassButtons;