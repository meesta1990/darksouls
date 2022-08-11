import CommonSessionInterface from "../../../entities/CommonSessionInterface";
import "./InfoPanelTools.css";
import amulet from '../../../assets/images/amulet.png';
import ember from '../../../assets/images/ember.png';
import estus from '../../../assets/images/estus.png';
import coin from '../../../assets/images/coin.png';
import soul from "../../../assets/images/soul.png";


const InfoPanelTools = ({
    session,
    user,
}: CommonSessionInterface) => {
    return (
        <span className="info-session-tools-wrapper">
            <span className="tool">
                <img src={estus} />
            </span>
            <span className="tool">
                <img src={amulet} />
            </span>
            <span className="tool">
                <img src={coin} />
            </span>
            <span className="tool">
                <img src={ember} />
            </span>
        </span>
    );
};
export default InfoPanelTools;
