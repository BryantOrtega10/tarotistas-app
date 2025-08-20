import { IonImg } from '@ionic/react';
import './RequestItem.css';

export type RequestItemProps = {
    user: {
        name: string;
        image: string
    },
    createdAgo: string
};

const RequestItem: React.FC<RequestItemProps> = ({ user, createdAgo }) => {
    return (
        <div className={`request-item-container`}>
            <figure>
                <IonImg src={user.image ? user.image : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className='request-item-desc'>
                <div className='request-username'>{user.name}</div>
                <span>Hace {createdAgo}</span>
            </div>
        </div>
    );
};

export default RequestItem;
