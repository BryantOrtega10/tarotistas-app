import { IonImg, IonRippleEffect } from '@ionic/react';
import './MyChatsItem.css';
import { useHistory } from 'react-router';

export type MyChatsItemProps = {
    user: {
        name: string;
        image: string;
    };
    lastMessage: string;
    unReadCount: number;
    lastMessageDate?: string;
    idChat: number;
};

const MyChatsItem: React.FC<MyChatsItemProps> = ({user, lastMessage, unReadCount = 0, lastMessageDate, idChat}) => {

    const history = useHistory()
    const handleNavigate = () => {
        //history.push(`/my-chats/${idChat}`)
    }

    return (
        <div className={`my-chats-item-container ion-activatable ripple-parent`} onClick={handleNavigate}>
            <IonRippleEffect></IonRippleEffect>
            <figure>
                <IonImg src={user.image ? user.image : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className={`my-chats-item-desc`}>
                <div className={`my-chats-item-username`}>{user.name}</div>
                <div className={`my-chats-item-message`}>{lastMessage}</div>
                <div className={`my-chats-item-date`}>{lastMessageDate}</div>
            </div>
            {(unReadCount > 0 && <span className='my-chats-item-counter'>{unReadCount}</span>)}
        </div>
    );
};

export default MyChatsItem;
