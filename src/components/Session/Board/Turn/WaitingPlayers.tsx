import React, {useEffect, useState} from "react";
import {CircularProgress, IconButton, Modal, ThemeProvider} from "@mui/material";
import { Session } from "../../../../entities/Session";
import { useAppSelector } from "../../../../store/hooks";
import { User } from "../../../../entities/User";
import './WaitingPlayers.css'
import {theme} from "../../../../utils/Constants";
import RefreshIcon from "@mui/icons-material/Refresh";
import Loader from "../../../Common/Loader";

interface IWaitingPlayers {
    session: Session;
}

export const WaitingPlayers = ({ session }: IWaitingPlayers) => {
    const [open, setOpen] = useState(false);
    const user: User = useAppSelector((state) => state.userReducer.user);

    useEffect(() => {
        const userJoined = session.players.players.find((p) => p.owner.uid === user.uid);

        if(userJoined && session.players.players.length === session.players.max_players) {
            setOpen(false);
        }
    }, [user, session.players.players])

    return (
        <Modal
            open={open}
            disableEnforceFocus
            sx={{
                backdropFilter: "blur(5px)",
            }}
            disablePortal
        >
            <div className="wrapper-modal-waiting_players">

                <ThemeProvider theme={theme}>
                    <h2 className="title">Waiting for players &nbsp;</h2>
                    <CircularProgress color="secondary" size={25} />
                </ThemeProvider>
            </div>
        </Modal>
    )
}