import { IonImg } from '@ionic/react';
import './LastestCommentsItem.css';
import CustomButton from '../CustomButton/CustomButton';

export type LastestCommentsItemProps = {
    user: {
        name: string;
        image: string;
    };
    message: string;
    replyMessage?: string;
    handleReply?: () => void
};

const LastestCommentsItem: React.FC<LastestCommentsItemProps> = ({user, message, replyMessage, handleReply}) => {
    return (
        <div className={`lastest-chats-container`}>
            <figure>
                <IonImg src={user.image ? user.image : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className={`lastest-chats-itemDesc`}>
                <div className={`lastest-chats-username`}>{user.name}</div>
                <div className={`lastest-chats-message`}>{message}</div>
                {(!replyMessage && <div className={`lastest-chats-replyContainer`}>
                    <CustomButton variant='white' onClick={handleReply}>Responder</CustomButton>
                </div>)}
                {(replyMessage && <div className={`lastest-chats-reply`}>{replyMessage}</div>)}
            </div>
        </div>
    );
};

export default LastestCommentsItem;
