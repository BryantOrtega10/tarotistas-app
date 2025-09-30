import { IonImg, IonRippleEffect } from '@ionic/react';
import './MyChatsItem.css';
import { useHistory } from 'react-router';
import { User } from '../../types/models/User';
import { Chat } from '../../types/models/Chat';

export type MyChatsItemProps = Chat 

const MyChatsItem: React.FC<MyChatsItemProps> = ({client, lastMessage, unReadCount = 0, lastMessageDate, idChat}) => {

    const history = useHistory()
    const handleNavigate = () => {
        //history.push(`/my-chats/${idChat}`)
    }

    return (
        <div className={`my-chats-item-container ion-activatable ripple-parent`} onClick={handleNavigate}>
            <IonRippleEffect></IonRippleEffect>
            <figure>
                <IonImg src={client.user.image ? client.user.image : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className={`my-chats-item-desc`}>
                <div className={`my-chats-item-username`}>{client.user.name}</div>
                <div className={`my-chats-item-message`}>{lastMessage}</div>
                <div className={`my-chats-item-date`}>{lastMessageDate}</div>
            </div>
            {(unReadCount > 0 && <span className='my-chats-item-counter'>{unReadCount}</span>)}
        </div>
    );
};

export default MyChatsItem;
