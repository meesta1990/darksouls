import { Session } from "../../entities/Session";
import { Paper } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import './SessionCreated.css'
import classNames from "classnames";
import {User} from "../../entities/User";
import {useAppSelector} from "../../store/hooks";

interface ISessionCreated {
    session: Session;
    onClick: (sessionID: string) => void
};

const SessionCreated = ({
    session,
    onClick
}: ISessionCreated) => {
    const user = useAppSelector((state) => state.userReducer.user);
    const isGameFull = (session.players?.max_players === session.players?.players?.length) &&
        !session.players?.players?.find((_player) => _player.owner.uid === user.uid)

    return (
        <div
            className={classNames("session", isGameFull && 'disabled')}
            onClick={() => !isGameFull ? onClick(session.id) : null}
        >
            <Paper>
                {session.name}
                {!isGameFull && session.password && <LockIcon color="secondary" className="icon-password-session"/>}

                <span className="players-number">
                    {session.players?.players?.length + '/' + session.players?.max_players}
                </span>
            </Paper>
        </div>
    );
}

export default SessionCreated;
