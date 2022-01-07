import { useEffect, useState } from "react";
import { getSession } from "../../services/Sessions/ServiceSession";
import { Session } from "../../entities/Session";
import { useParams } from 'react-router-dom';
import Page from "../Page/Page";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import './SessionView.css';
import Chat from "./Chat";
import { User } from "../../entities/User";
import { Class } from "../../entities/Class";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import CharacterInventory from "../Character/CharacterInventory";
import ClassButtons from "./ClassButtons";

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

    useEffect(() => {
        if (sessionID) {
            getSession(sessionID, (session: Session) => {
                setSession(session);

                const tempAvaibleClasses = ['knight', 'warrior', 'assassin', 'herald'];
                const tempExludedClasses = session?.players?.players.filter(_class => tempAvaibleClasses.includes(_class.name));
                const tempExludedClassesExtrapolated = tempExludedClasses.map((_class: Class) => {
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
            });
        }
    }, []);

    useEffect(() => {
        if (choosedClass === null) {
            setModalChooseClass(true);
        }
    }, [choosedClass]);

    if (!session) return <Page />
    return (
        <Page className="session-view" disableLogo >
            <Modal
                open={modalChooseClass}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalChooseClass} className="modal modal-chose-new-class">
                    <Box>
                        <ClassButtons onClassChoosed={setNewPlayerChoosedClass} excludedClasses={excludedClasses}/>
                        <CharacterInventory choosedClass={newPlayerChoosedClass}/>

                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className="btn-join-game"
                            disabled={newPlayerChoosedClass === undefined}
                        >
                            Join the game
                        </Button>
                    </Box>
                </Fade>
            </Modal>

            <LeftBar players={session.players} user={user} />
            {choosedClass && <RightBar choosedClass={choosedClass} /> }
            <Chat session={session} user={user} />
        </Page>
    )
};

export default SessionView;
