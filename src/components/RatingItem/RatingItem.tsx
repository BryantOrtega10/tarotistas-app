import { IonIcon, IonImg, IonRippleEffect } from '@ionic/react';
import './RatingItem.css';
import { Rating } from '../../types/models/Rating';
import { star, starHalf, starOutline } from 'ionicons/icons';
import { CalificacionItem } from '../../types/responses/CalificacionesResponse';

export type RatingItemProps = CalificacionItem & {
    handleClick?: () => void
}

const RatingItem: React.FC<RatingItemProps> = ({ cliente, calificacion, fecha, handleClick = () => { } }) => {

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (calificacion >= i) {
            // estrella llena
            stars.push(<IonIcon key={i} icon={star} />);
        } else if (calificacion >= i - 0.5) {
            // media estrella
            stars.push(<IonIcon key={i} icon={starHalf} />);
        } else {
            // estrella vacía
            stars.push(<IonIcon key={i} icon={starOutline} />);
        }
    }



    return (
        <div className={`rating-item`} onClick={handleClick}>
            <figure className='rating-item-user-image'>
                <IonImg src={cliente.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${cliente.photo}` : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className='rating-item-desc'>
                <h3>{cliente.name}</h3>
                {fecha && <span>{fecha}</span>}
                <div className='stars-container'>{stars}</div>
                <span className='rating-number'>{calificacion}</span>
            </div>
        </div>
    );
};

export default RatingItem;
