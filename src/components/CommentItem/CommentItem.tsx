import { IonImg, IonRippleEffect } from '@ionic/react';
import './CommentItem.css';
import { ComentarioItemHome } from '../../types/responses/ComentarioResponse';
import { useAuth } from '../../context/AuthContext';

export type CommentItemProps = ComentarioItemHome & {
    handleReply?: () => void
}

const CommentItem: React.FC<CommentItemProps> = ({ cliente, comentario, respuesta_com, fecha, handleReply }) => {

    const { loggedInUser } = useAuth()

    return (
        <div className={`comment-item ion-activatable ripple-parent`} onClick={handleReply}>
            <IonRippleEffect></IonRippleEffect>

            <figure className='comment-item-user-image'>
                <IonImg src={cliente.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${cliente.photo}` : '/assets/images/no-person/no-person.png'} />
            </figure>
            <div className='comment-item-desc'>
                <h3>{cliente.name}</h3>
                {fecha && <span>{fecha}</span>}
                {comentario && <p>{comentario}</p>}
                {(respuesta_com && loggedInUser && <div className='comment-item-line'></div>)}
                <img src={`/assets/images/chat-ico/chat-ico.png`}
                    className='chat-icon'
                    srcSet={`
                        /assets/images/chat-ico/chat-ico.png 1x,
                        /assets/images/chat-ico/chat-ico@2x.png 2x,
                        /assets/images/chat-ico/chat-ico@3x.png 3x
                    `} />
                {(respuesta_com && loggedInUser &&
                    <div className={`comment-item-reply`}>
                        <div className='comment-item-reply-me'>
                            <figure>
                                <IonImg src={loggedInUser.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${loggedInUser.photo}` : '/assets/images/no-person/no-person.png'} />
                            </figure>
                            <div className='comment-item-reply-text'>
                                <b>Tú</b>
                                <div>{respuesta_com}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default CommentItem;
