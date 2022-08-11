import "./InfoPanelSouls.css";
import soul from "../../../assets/images/soul.png";

interface InfoPanelSoulsInterface {
    souls: number;
}

const InfoPanelSouls = ({
    souls,
}: InfoPanelSoulsInterface) => {
    return (
        <span className="info-session-souls-wrapper">
            <img src={soul} className="img-soul" />
            <span>
                {souls}
            </span>
        </span>
    );
};
export default InfoPanelSouls;
