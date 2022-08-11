import { Session } from "../../../entities/Session";
import { User } from "../../../entities/User";
import "./InfoPanel.css";
import soul from '../../../assets/images/soul.png';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import CommonSessionInterface from "../../../entities/CommonSessionInterface";
import InfoPanelStats from "./InfoPanelStats";
import InfoPanelLife from "./InfoPanelLife";
import InfoPanelTools from "./InfoPanelTools";

const InfoPanel = ({
    session,
    onFocus,
    user,
    focused = false
}: CommonSessionInterface) => {
    const playerClass = session.players.players?.find((_class) => _class.owner.uid === user.uid);
    const handleGameFocus = () => {
        onFocus('info-panel');
    }

    return (
        <div className="panel info-panel" onClick={handleGameFocus}>
            <div className="panel char-panel">
                <InfoPanelTools session={session} user={user} />
                <InfoPanelLife session={session} user={user} />
            </div>
        </div>
    )
}

export default InfoPanel;
