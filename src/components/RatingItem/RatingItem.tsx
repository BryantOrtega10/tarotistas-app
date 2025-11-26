import { IonIcon, IonImg, IonRippleEffect } from '@ionic/react';
import './RatingItem.css';
import { Rating } from '../../types/models/Rating';
import { star, starHalf, starOutline } from 'ionicons/icons';

export type RatingItemProps = Rating & {
    handleClick?: () => void
}

const RatingItem: React.FC<RatingItemProps> = ({ user, rating, ratingDate, handleClick = () => { } }) => {

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            // estrella llena
            stars.push(<IonIcon key={i} icon={star} />);
        } else if (rating >= i - 0.5) {
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
                <IonImg src={user.image ? user.image : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className='rating-item-desc'>
                <h3>{user.name}</h3>
                {ratingDate && <span>{ratingDate}</span>}
                <div className='stars-container'>{stars}</div>
                <span className='rating-number'>{rating}</span>
            </div>
        </div>
    );
};

export default RatingItem;
