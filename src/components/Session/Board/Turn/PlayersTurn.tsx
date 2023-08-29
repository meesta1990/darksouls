import React, { useState } from "react";
import { Button, Modal, ThemeProvider } from "@mui/material";
import { ReactSortable } from "react-sortablejs";
import './PlayersTurn.css'
import { Class } from "../../../../entities/Class";
import { theme } from "../../../../utils/Constants";
import {updateSession} from "../../../../services/Sessions/ServiceSession";
import { Session } from "../../../../entities/Session";

interface IPlayerTurn {
    players: Class[];
    open: boolean;
    session: Session;
    onSave(): void;
}

export const PlayersTurn = ({
    players,
    open,
    session,
    onSave
}: IPlayerTurn) => {
    const [playersOrder, setPlayersOrder] = useState<any[]>(players);

    const handleSave = () => {
        session.currentTile.playersOrder = playersOrder;
        updateSession(session).then(() => {
            onSave();
        })
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                backdropFilter: "blur(5px)",
            }}
        >
            <div className="wrapper-modal-turn">
                <h1 className="title">Players order</h1>
                <p className="subtitle">Drag the players and decide the order</p>
                <div className="players">
                    <ReactSortable
                        list={playersOrder}
                        setList={setPlayersOrder}
                        animation={200}
                        delay={2}
                    >
                        {playersOrder.map((player) => (
                            <span key={'player_turn_' + player.name} className="player">
                                <img src={player.src_board} />
                                <p className="player_class">{player.name}</p>
                                <p className="player_name">{player.owner.username}</p>
                            </span>
                        ))}
                    </ReactSortable>
                </div>

                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={handleSave}
                    >
                        Save order
                    </Button>
                </ThemeProvider>
            </div>
        </Modal>
    )
}