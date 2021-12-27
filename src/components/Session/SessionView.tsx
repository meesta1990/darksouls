import { useEffect, useState } from "react";
import { getSession } from "../../services/Sessions/ServiceSession";
import { Session } from "../../entities/Session";
import { useParams } from 'react-router-dom';
import Page from "../Page/Page";
import LeftBar from "./LeftBar";
import './SessionView.css';

interface ISessionView {
    user: any;
}

const SessionView = ({ user }: ISessionView) => {
    const { sessionID } = useParams();
    const [session, setSession] = useState<Session>();

    useEffect(() => {
        if (sessionID) {
            getSession(sessionID).then((session: any)=>{
                setSession(session);
            })
        }
    }, []);

    if (!session) return <div />
    return (
        <Page className="session-view" disableLogo>
            <LeftBar players={session.players} user={user} />
        </Page>
    )
};

export default SessionView;
