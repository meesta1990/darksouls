import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    ThemeProvider
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import './Sessions.css';
import {ROUTER_SESSION, theme} from '../../utils/Constants';
import { getSessions } from '../../services/Sessions/ServiceSession';
import { Session } from '../../entities/Session';
import SessionCreated from "./SessionCreated";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

const Sessions = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [modalPasswordOpen, setModalPasswordOpen] = useState<boolean>(false);
    const [insertedPasswordSession, setInsertedPasswordSession] = useState<string>('');
    const [selectedSession, setSelectedSession] = useState<Session | null>();
    const [errorPasswordSession, setErrorPasswordSession] = useState<string>('');
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

    const checkPasswordSession = (session: Session) => {
        setModalPasswordOpen(true);
        setSelectedSession(session);
    }

    const handleCheckPasswordSession = () => {
        if(selectedSession && selectedSession.password === insertedPasswordSession) {
            goToSession(selectedSession.id);
        } else {
            setErrorPasswordSession('Wrong password')
        }
    }

    const handleCloseModalPasswordOpen = () => {
        setErrorPasswordSession('');
        setSelectedSession(null);
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
                    <SessionCreated key={session.id} session={session} onClick={session.password ? () => checkPasswordSession(session) : goToSession} />
                )
                :
                    <p>
                        No sessions
                    </p>
                }
            </Card>

            <Dialog
                open={modalPasswordOpen}
                className="modal-password"
                onClose={handleCloseModalPasswordOpen}
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle id="alert-dialog-title">
                    Enter the password
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Password"
                        error={errorPasswordSession !== ''}
                        variant="outlined"
                        color="secondary"
                        onChange={(e: any) => setInsertedPasswordSession(e.target.value)}
                    />
                    <p className="error">
                        {errorPasswordSession}
                    </p>
                </DialogContent>
                <DialogActions>
                    <div className="button-container">
                        <Button variant="contained" color="primary" onClick={() => setModalPasswordOpen(false)}>Back</Button>
                        <Button variant="contained" color="primary" onClick={handleCheckPasswordSession}>Enter</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Sessions;
