import CommonSessionInterface from "../../../entities/CommonSessionInterface";
import "./InfoPanelLife.css"

const InfoPanelLife = ({
   session,
   user,
}: CommonSessionInterface) => {
    return (
        <span className="info-session-life-wrapper">
            <span className="cube-life" />
            <span className="cube-life" />
            <span className="cube-life" />
            <span className="cube-life" />
            <span className="cube-life" />
            <span className="cube-life" />
            <span className="cube-life" />
            <span className="cube-life" />
            <span className="cube-life" />
            <span className="cube-life" />
        </span>
    );
}

export default InfoPanelLife;
