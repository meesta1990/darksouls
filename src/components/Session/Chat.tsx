import './Chat.css'
import {ChatMessage, IChat, IMessage} from "../../entities/Chat";
import { Card, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState } from "react";
import { User } from "../../entities/User";
import { sendChatMessage } from "../../services/Sessions/ServiceSession";
import { Session } from "../../entities/Session";
import Moment from 'react-moment';
import 'moment-timezone';
import { DATE_FORMAT } from "../../utils/Constants";
import classNames from "classnames";

interface IChatComponent {
    session: Session;
    user: User;
    onFocus: any;
    focused?: boolean;
}

const Chat = ({
    session,
    user,
    onFocus,
    focused = false
}: IChatComponent) => {
    const [message, setMessage] = useState('');
    const messagesEndRef: any = useRef(null);

    const sendMessage = () => {
        if (message.trim().length !== 0) {
            const chatMessage = new ChatMessage({
                author: user,
                message: message,
                sentDate: new Date().getTime()
            });

            sendChatMessage(session, chatMessage).then(() => {
                setMessage('');
                messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
            });
        } else {
            setMessage('');
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            sendMessage();
            e.stopPropagation();
            e.preventDefault();
        }
    }

    const handleChatFocus = () => {
        onFocus('chat');
    }

    return (
        <Card variant="outlined" className={classNames("chat-container", focused && 'focused')} onClick={handleChatFocus}>
            <div className="chat-body" ref={messagesEndRef}>
                {session.chat?.messages && Object.keys(session.chat?.messages).map((key: string) => (
                    <div className="message" key={key}>
                        <span className="date-message">
                            <Moment format={DATE_FORMAT}>{new Date(session.chat?.messages[key].sentDate)}</Moment>
                        </span>
                        <span className="author">
                            {session.chat?.messages[key].author?.username}:
                        </span>
                        <span className="text-message">
                            {session.chat?.messages[key].message}
                        </span>
                    </div>
                ))}
            </div>

            <OutlinedInput
                color="secondary"
                size="small"
                multiline
                onKeyDown={handleKeyDown}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={sendMessage}
                        >
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                }
                maxRows={3}
            />
        </Card>
    )
};

export default Chat;
