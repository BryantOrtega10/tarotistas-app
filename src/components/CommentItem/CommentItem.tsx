import { IonImg, IonRippleEffect } from '@ionic/react';
import './CommentItem.css';
import { Comment } from '../../types/models/Comment';

export type CommentItemProps = Comment & {
    handleClick?: () => void
}

const CommentItem: React.FC<CommentItemProps> = ({message, user, messageDate, replyMessage, handleClick = () => {}}) => {

    return (
        <div className={`comment-item ion-activatable ripple-parent`} onClick={handleClick}>
            <IonRippleEffect></IonRippleEffect>
            <figure className='comment-item-user-image'>
                <IonImg src={user.image ? user.image : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className='comment-item-desc'>
                <h3>{user.name}</h3>
                {messageDate && <span>{messageDate}</span>}
                {message && <p>{message}</p>}
                <img src={`/assets/images/chat-ico/chat-ico.png`}
                    className='chat-icon'
                    srcSet={`
                    /assets/images/chat-ico/chat-ico.png 1x,
                    /assets/images/chat-ico/chat-ico@2x.png 2x,
                    /assets/images/chat-ico/chat-ico@3x.png 3x
                `} />
            </div>
        </div>
    );
};

export default CommentItem;
