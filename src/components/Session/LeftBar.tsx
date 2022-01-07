import './LeftBar.css'
import { Avatar } from "@mui/material";
import { ISessionPlayers } from "../../entities/Session";

interface ILeftBar {
    user: any;
    players: ISessionPlayers;
}

const LeftBar = ({
    players,
    user
}: ILeftBar) => {
    return (
        <div className="left-bar">
            {
                Array.apply(0, Array(players.max_players)).map((x, i) => {
                    return <span className="party-player" key={'player_' + i} >
                        <Avatar
                            alt="Remy Sharp"
                            className={players.players[i]?.owner?.uid === user.uid ? 'my-pg' : ''}
                            src={players.players[i]?.profile_photo}/>
                        <span className="party-player-nane">
                            {players.players[i]?.owner.username}
                        </span>
                    </span>
                })
            }
        </div>
    );
}

export default LeftBar;
