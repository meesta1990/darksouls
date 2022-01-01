import './Chat.css'
import { ChatMessage, IChat } from "../../entities/Chat";
import { Card, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState } from "react";
import { User } from "../../entities/User";
import { sendChatMessage } from "../../services/Sessions/ServiceSession";
import { Session } from "../../entities/Session";

interface IChatComponent {
    session: Session;
    user: User;
}

const Chat = ({
    session,
    user
}: IChatComponent) => {
    const [message, setMessage] = useState('');
    const messagesEndRef: any = useRef(null);

    const sendMessage = () => {
        if (message.trim().length !== 0) {
            const chatMessage = new ChatMessage({
                author: null, //todo
                message: message,
                sentDate: new Date().getTime()
            });

            sendChatMessage(session, chatMessage).then(() => {
                setMessage('');
               // messagesEndRef.current.scrollIntoView();
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

    return (
        <Card variant="outlined" className="chat-container">
            <div className="chat-body" ref={messagesEndRef}>
                {Object.keys(session.chat?.messages).map((item: string, i) => (
                    <div key={item}>{session.chat?.messages[item].message}</div>
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
