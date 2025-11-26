import { IonImg } from '@ionic/react';
import './LastestCommentsItem.css';
import CustomButton from '../CustomButton/CustomButton';
import { useAuth } from '../../context/AuthContext';
import { Comment } from '../../types/models/Comment';

export type LastestCommentsItemProps = Comment & {
    handleReply?: () => void
};

const LastestCommentsItem: React.FC<LastestCommentsItemProps> = ({ user, message, replyMessage, handleReply }) => {

    const { loggedInUser } = useAuth()

    return (
        <div className={`lastest-comments-container`}>
            <figure>
                <IonImg src={user.image ? user.image : '/assets/images/no-person/no-person.png'} />
            </figure>

            <div className={`lastest-comments-itemDesc`}>
                <div className={`lastest-comments-username`}>{user.name}</div>
                <div className={`lastest-comments-message`}>
                    {message}
                    {(replyMessage && loggedInUser && <div className='lastest-comments-line'></div>)}
                </div>
                {(!replyMessage && <div className={`lastest-comments-replyContainer`}>
                    <CustomButton variant='white' onClick={handleReply}>Responder</CustomButton>
                </div>)}
                {(replyMessage && loggedInUser &&
                    <div className={`lastest-comments-reply`}>
                        <div className='lastest-comments-me'>
                            <figure>
                                <IonImg src={loggedInUser.image ? loggedInUser.image : '/assets/images/no-person/no-person.png'} />
                            </figure>
                            <div className='lastest-comments-reply-text'>
                                <b>Tú</b>
                                <div>{replyMessage}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LastestCommentsItem;
