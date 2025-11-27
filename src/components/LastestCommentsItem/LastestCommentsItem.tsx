import { IonImg } from '@ionic/react';
import './LastestCommentsItem.css';
import CustomButton from '../CustomButton/CustomButton';
import { useAuth } from '../../context/AuthContext';
import { Comment } from '../../types/models/Comment';
import { ComentarioItemHome } from '../../types/responses/ComentarioResponse';

export type LastestCommentsItemProps = ComentarioItemHome & {
    handleReply?: () => void
};

const LastestCommentsItem: React.FC<LastestCommentsItemProps> = ({ cliente, comentario, respuesta_com, handleReply }) => {

    const { loggedInUser } = useAuth()

    return (
        <div className={`lastest-comments-container`}>
            <figure>
                <IonImg src={cliente?.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${cliente.photo}` : '/assets/images/no-person/no-person.png'} />
            </figure>

            <div className={`lastest-comments-itemDesc`}>
                <div className={`lastest-comments-username`}>{cliente.name}</div>
                <div className={`lastest-comments-message`}>
                    {comentario}
                    {(respuesta_com && loggedInUser && <div className='lastest-comments-line'></div>)}
                </div>
                {(!respuesta_com && <div className={`lastest-comments-replyContainer`}>
                    <CustomButton variant='white' onClick={handleReply}>Responder</CustomButton>
                </div>)}
                {(respuesta_com && loggedInUser &&
                    <div className={`lastest-comments-reply`}>
                        <div className='lastest-comments-me'>
                            <figure>
                                <IonImg src={loggedInUser.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${loggedInUser.photo}` : '/assets/images/no-person/no-person.png'} />
                            </figure>
                            <div className='lastest-comments-reply-text'>
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

export default LastestCommentsItem;
