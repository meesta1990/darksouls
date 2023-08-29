import { useEffect, useState } from "react";
import { getSession, joinSession } from "../../services/Sessions/ServiceSession";
import { Session } from "../../entities/Session";
import { useParams } from 'react-router-dom';
import Page from "../Page/Page";
import './LeftBar.css'
import RightBar from "./RightBar";
import './SessionView.css';
import Chat from "./Chat";
import { User } from "../../entities/User";
import { Class } from "../../entities/Class";
import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CharacterInventory from "../Character/CharacterInventory";
import ClassButtons from "./ClassButtons";
import Game from "./Game";
import InfoPanel from "./InfoPanel/InfoPanel";
import InfoPanelSouls from "./InfoPanel/InfoPanelSouls";
import ReactAudioPlayer from "react-audio-player";
import {useAppSelector} from "../../store/hooks";


const SessionView = () => {
    const { sessionID } = useParams();
    const [session, setSession] = useState<Session>();
    const [choosedClass, setChoosedClass] = useState<Class | null | undefined>(undefined);
    // class to choose for a new player:
    const [modalChooseClass, setModalChooseClass] = useState<boolean>(false);
    const [newPlayerChoosedClass, setNewPlayerChoosedClass] = useState<Class>();
    const [excludedClasses, setExcludedClasses] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [focusedElement, setFocusedElement] = useState<string>();
    const user = useAppSelector((state) => state.userReducer.user);

    useEffect(() => {
        if (sessionID && user.uid) {
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
    }, [sessionID, user.uid]);

    useEffect(() => {
        if (choosedClass === null) {
            setModalChooseClass(true);
        }
    }, [choosedClass]);

    useEffect(() => {

    }, [session?.currentTile]);

    const handleJoinGame = () => {
        if (session && newPlayerChoosedClass && user) {
            setLoading(true);

            joinSession(session, user, newPlayerChoosedClass).then(() => {
                setModalChooseClass(false);
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    const handleFocus = (who: string) => {
        setFocusedElement(who);
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

            <div className="left-bar">
                {
                    session.players && session.players.players && Array.apply(0, Array(session.players.max_players)).map((x, i) => {
                        return <span className="party-player" key={'player_' + i} >
                        <Avatar
                            alt="Remy Sharp"
                            className={session.players?.players[i]?.owner?.uid === user.uid ? 'my-pg' : ''}
                            src={session.players?.players[i]?.profile_photo}/>
                        <span className="party-player-nane">
                            {session.players?.players[i]?.owner.username}
                        </span>
                    </span>
                    })
                }

                <Chat session={session} user={user} onFocus={handleFocus} focused={focusedElement === 'chat'}/>
            </div>

            <Game session={session} user={user} onFocus={handleFocus} focused={focusedElement === 'game'} />

            <div className="right-space">
                {choosedClass && <RightBar user={user} session={session} onFocus={handleFocus} focused={focusedElement === 'rightBar'} /> }
                <InfoPanel session={session} user={user} onFocus={handleFocus} focused={focusedElement === 'infoPanel'}/>
            </div>

            <InfoPanelSouls souls={session.souls}/>
        </Page>
    )
};

export default SessionView;
