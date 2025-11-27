import { IonImg } from '@ionic/react';
import './RequestItem.css';
import CustomButton from '../CustomButton/CustomButton';
import { User } from '../../models/User.model';


export type RequestItemProps = {
    user: User;
    createdAgo: string;
    chat_id: number;
    handleGoChat: (chat_id:number) => void
};

const RequestItem: React.FC<RequestItemProps> = ({ user, createdAgo, chat_id, handleGoChat }) => {
    return (
        <div className={`request-item-container`}>
            <figure>
                <IonImg src={user.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${user.photo}` : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className='request-item-desc'>
                <div className='request-username'>{user.name}</div>
                <span>{createdAgo}</span>
            </div>
            <div>
                <CustomButton variant='white' onClick={() => handleGoChat(chat_id)}><img src={`/assets/images/conversacion/conversacion.png`}
                    className='ico-chat'
                    srcSet={`
                    /assets/images/conversacion/conversacion.png 1x,
                    /assets/images/conversacion/conversacion@2x.png 2x,
                    /assets/images/conversacion/conversacion@3x.png 3x
                `} /> Ir al chat</CustomButton>
            </div>
        </div>
    );
};

export default RequestItem;
