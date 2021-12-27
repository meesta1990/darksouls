import { Session } from "../../entities/Session";

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
            {session.name}
        </div>
    );
}

export default SessionCreated;
