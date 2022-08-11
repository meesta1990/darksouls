import { Paper } from "@mui/material";
import './SoulCardSession.css';
import { ISoulsCards } from "../../entities/Monster";
import tier_1_back from '../../assets/images/souls_cards/tier_1_back.jpg';
import tier_2_back from '../../assets/images/souls_cards/tier_2_back.jpg';
import tier_3_back from '../../assets/images/souls_cards/tier_3_back.jpg';

interface ISoulCardSession {
    soul_cards: ISoulsCards
    onDragStart?(e: any, soulsLevel: number, soulsLevelID: string) : void;
    onDragEnd?(soulsLevelID: string) : void;
    usedSoulsLevel?: string[];
    encounter?: 'miniboss' | 'boss';
}

const SoulCardSession = ({
    onDragStart,
    onDragEnd,
    soul_cards,
    usedSoulsLevel,
    encounter
}: ISoulCardSession) => {
    const handleDragStart = (e: any, soulsLevel: number, soulsLevelID: string) => {
        if (onDragStart) {
            onDragStart(e, soulsLevel, soulsLevelID);
        }
    }

    const handleDragEnd = (soulsLevelID: string) => {
        if (onDragEnd) {
            onDragEnd(soulsLevelID);
        }
    }

    const getSoulsCards = (soulsLevel: number) => {
        const tier = 'tier_' + soulsLevel;
        const papers = [];

        if (soul_cards[tier]) {
            const array = Array.apply(0, Array(soul_cards[tier]));

            for (let i=0; i<array.length; i++) {
                const key = encounter + '_' + tier +i;
                let backCard = '';

                switch (soulsLevel){
                    case 1:
                        backCard = tier_1_back;
                        break;
                    case 2:
                        backCard = tier_2_back;
                        break;
                    case 3:
                        backCard = tier_3_back;
                        break;
                }

                papers.push(
                    <Paper variant="outlined" className="soul-card" key={key}>
                        <img
                            className={usedSoulsLevel?.find(element => element === (key)) && 'disabled'}
                            src={backCard}
                            onDragStart={(e: any) => handleDragStart(e, soulsLevel, key)}
                            onDragEnd={() => handleDragEnd(key)}
                        />
                    </Paper>
                );
            }
        }

        return papers;
    }

    return (
        <>
            { getSoulsCards(1) }
            { getSoulsCards(2) }
            { getSoulsCards(3) }
        </>
    )
};

export default SoulCardSession;
