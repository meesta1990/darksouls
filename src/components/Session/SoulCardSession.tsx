import { Paper } from "@mui/material";
import './SoulCardSession.css';
import { ISoulsCards } from "../../entities/Monster";
import tier_1_back from '../../assets/images/souls_cards/tier_1_back.jpg';
import tier_2_back from '../../assets/images/souls_cards/tier_2_back.jpg';
import tier_3_back from '../../assets/images/souls_cards/tier_3_back.jpg';

interface ISoulCardSession {
    soul_cards: ISoulsCards
}

const SoulCardSession = ({
    soul_cards
}: ISoulCardSession) => {
    return (
        <>
            {
                Array.apply(0, Array(soul_cards.tier_1)).map((x, i) => {
                    return <Paper variant="outlined" className="soul-card" key={'tier_1_'+i}>
                        <img src={tier_1_back} />
                    </Paper>
                })
            }

            {
                Array.apply(0, Array(soul_cards.tier_2)).map((x, i) => {
                    return <Paper variant="outlined" className="soul-card" key={'tier_2_'+i}>
                        <img src={tier_2_back} />
                    </Paper>
                })
            }

            {
                Array.apply(0, Array(soul_cards.tier_3)).map((x, i) => {
                    return <Paper variant="outlined" className="soul-card" key={'tier_3_'+i}>
                        <img src={tier_3_back} />
                    </Paper>
                })
            }
        </>
    )
};

export default SoulCardSession;
