import { useEffect, useState } from 'react';
import { Card, CircularProgress, IconButton, ThemeProvider } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import './Sessions.css';
import {ROUTER_CREATE_SESSION, ROUTER_SESSION, theme} from '../../utils/Constants';
import { getSessions } from '../../services/Sessions/ServiceSession';
import { Session } from '../../entities/Session';
import SessionCreated from "./SessionCreated";
import { useNavigate } from "react-router-dom";

const Sessions = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sessions, setSessions] = useState<[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
       loadSessions();
    }, []);

    const loadSessions = () => {
        setLoading(true);

        getSessions().then((snap: any) => {
            if (snap) {
                setSessions(snap);
            }
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
        })
    }

    const goToSession = (sessionID: string) => {
        navigate(ROUTER_SESSION + '/' + sessionID);
    }

    return (
        <div className="card-session-container">
            <Card variant="outlined" className="card-session">
                <ThemeProvider theme={theme}>
                    { loading && <CircularProgress color="secondary" />}

                    <IconButton aria-label="delete" color="secondary" disabled={loading} onClick={loadSessions}>
                        <RefreshIcon />
                    </IconButton>
                </ThemeProvider>

                {sessions.length > 0 ? sessions.map((session: Session) =>
                    <SessionCreated key={session.id} session={session} onClick={goToSession} />
                )
                :
                    <p>
                        No sessions
                    </p>
                }
            </Card>
        </div>
    );
};

export default Sessions;
