import { IonImg } from '@ionic/react';
import './RequestItem.css';
import CustomButton from '../CustomButton/CustomButton';
import { User } from '../../types/models/User';

export type RequestItemProps = {
    user: User,
    createdAgo: string,
};

const RequestItem: React.FC<RequestItemProps> = ({ user, createdAgo }) => {

    const handleGoChat = () => {
        console.log("TODO: go chat")
    }

    return (
        <div className={`request-item-container`}>
            <figure>
                <IonImg src={user.image ? user.image : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className='request-item-desc'>
                <div className='request-username'>{user.name}</div>
                <span>Hace {createdAgo}</span>
            </div>
            <div>
                <CustomButton variant='white' onClick={handleGoChat}><img src={`/assets/images/conversacion/conversacion.png`}
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
