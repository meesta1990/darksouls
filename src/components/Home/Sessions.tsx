import { useEffect, useState } from 'react';
import {Card, CircularProgress, IconButton, ThemeProvider} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import './Sessions.css';
import { theme } from '../../utils/Constants';
import { getSessions } from '../../services/Sessions/ServiceSession';
import { Session } from '../../entities/Session/Session';

const Sessions = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sessions, setSessions] = useState<[]>([]);

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
                    <div key={session.id}>

                    </div>
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