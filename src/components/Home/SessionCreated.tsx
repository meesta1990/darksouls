import { Session } from "../../entities/Session";
import { Paper } from "@mui/material";
import './SessionCreated.css'

interface ISessionCreated {
    session: Session;
    onClick: (sessionID: string) => void
};

const SessionCreated = ({
    session,
    onClick
}: ISessionCreated) => {
    return (
        <div className="session" key={session.id} onClick={() => onClick(session.id)}>
            <Paper>
                {session.name}
            </Paper>
        </div>
    );
}

export default SessionCreated;
