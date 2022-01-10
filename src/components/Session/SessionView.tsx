import { useEffect, useState } from "react";
import { getSession, joinSession } from "../../services/Sessions/ServiceSession";
import { Session } from "../../entities/Session";
import { useParams } from 'react-router-dom';
import Page from "../Page/Page";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import './SessionView.css';
import Chat from "./Chat";
import { User } from "../../entities/User";
import { Class } from "../../entities/Class";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import CharacterInventory from "../Character/CharacterInventory";
import ClassButtons from "./ClassButtons";
import Game from "./Game";

interface ISessionView {
    user: User;
}

const SessionView = ({ user }: ISessionView) => {
    const { sessionID } = useParams();
    const [session, setSession] = useState<Session>();
    const [choosedClass, setChoosedClass] = useState<Class | null | undefined>(undefined);
    // class to choose for a new player:
    const [modalChooseClass, setModalChooseClass] = useState<boolean>(false);
    const [newPlayerChoosedClass, setNewPlayerChoosedClass] = useState<Class>();
    const [excludedClasses, setExcludedClasses] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (sessionID) {
            setLoading(true);

            getSession(sessionID, (session: Session) => {
                setSession(session);

                const tempAvaibleClasses = ['knight', 'warrior', 'assassin', 'herald'];
                const tempExludedClasses = session?.players?.players?.filter(_class => tempAvaibleClasses.includes(_class.name));
                const tempExludedClassesExtrapolated = tempExludedClasses?.map((_class: Class) => {
                    return _class.name
                });
                setExcludedClasses(tempExludedClassesExtrapolated);

                //find the connected player:
                const _choosedClass = session?.players?.players?.find((_class) => {
                    return _class?.owner?.uid === user.uid
                });
                if (_choosedClass) {
                    setChoosedClass(_choosedClass);
                } else {
                    setChoosedClass(null);
                }

                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        if (choosedClass === null) {
            setModalChooseClass(true);
        }
    }, [choosedClass]);

    const handleJoinGame = () => {
        if (session && newPlayerChoosedClass) {
            setLoading(true);

            joinSession(session, user, newPlayerChoosedClass).then(() => {
                setModalChooseClass(false);
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    if (!session) return <Page />
    return (
        <Page className="session-view" disableLogo loading={loading}>
            <Dialog
                open={modalChooseClass}
                className="modal-chose-new-class"
                fullWidth={true}
                maxWidth={'md'}
                scroll="body"
            >
                <DialogTitle id="alert-dialog-title">
                    Choose your class
                </DialogTitle>
                <DialogContent>
                    <ClassButtons onClassChoosed={setNewPlayerChoosedClass} excludedClasses={excludedClasses}/>
                    <CharacterInventory choosedClass={newPlayerChoosedClass}/>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={handleJoinGame}
                        className="btn-join-game"
                        disabled={newPlayerChoosedClass === undefined}
                    >
                        Join the game
                    </Button>
                </DialogActions>
            </Dialog>

            <LeftBar players={session.players} user={user} />
            {choosedClass && <RightBar choosedClass={choosedClass} /> }
            <Chat session={session} user={user} />
            <Game session={session} user={user} />
        </Page>
    )
};

export default SessionView;
