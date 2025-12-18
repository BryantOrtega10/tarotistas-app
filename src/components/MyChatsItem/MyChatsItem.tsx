import { IonImg, IonRippleEffect } from '@ionic/react';
import './MyChatsItem.css';
import { useHistory } from 'react-router';
import { User } from '../../types/models/User';
import { Chat } from '../../types/models/Chat';
import { ChatItemHome } from '../../types/responses/ChatResponse';

export type MyChatsItemProps = ChatItemHome &{ 
    handleGoChat: (chat_id:number) => void
}

const MyChatsItem: React.FC<MyChatsItemProps> = ({cliente, mensaje, unread = 0, fecha, idChat, handleGoChat}) => {

    return (
        <div className={`my-chats-item-container ion-activatable ripple-parent`} onClick={() => handleGoChat(idChat)}>
            <IonRippleEffect></IonRippleEffect>
            <figure>
                <IonImg src={cliente.user.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${cliente.user.photo}` : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className={`my-chats-item-desc`}>
                <div className={`my-chats-item-username`}>{cliente.user.name}</div>
                <div className={`my-chats-item-message`}>{mensaje}</div>
                <div className={`my-chats-item-date`}>{fecha}</div>
            </div>
            {(unread > 0 && <span className='my-chats-item-counter'>{unread}</span>)}
        </div>
    );
};

export default MyChatsItem;
