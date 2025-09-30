import './ChatMessageItem.css';
import { Message, SenderTypes } from '../../types/models/Chat';

export type ChatMessageItemProps = Message 

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({message, sender}) => {

    return (
        <div className={`chat-message-${sender === SenderTypes.TAROTISTA ? 'own' : 'external'}`}>
            <div className={`chat-message-text-container`}>{message}</div>
        </div>
    );
};

export default ChatMessageItem;
