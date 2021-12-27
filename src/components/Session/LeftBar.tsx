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
                    return <Avatar
                        alt="Remy Sharp"
                        className={players.players[i]?.owner?.id === user.uid ? 'my-pg' : ''}
                        src={players.players[i]?.profile_photo}
                        key={players.players[i]?.name} />
                })
            }
        </div>
    );
}

export default LeftBar;
