import { IonImg } from '@ionic/react';
import './ProfileImage.css';

export type ProfileImageProps = {
    user: {
        name: string;
        image: string;
    },
    showName?: boolean
    isEditable?: boolean
};

const ProfileImage: React.FC<ProfileImageProps> = ({ user, showName = false, isEditable = false }) => {
    return (
        <div className={`profile-image-container`}>
            <figure>
                <IonImg src={user.image ? user.image : '/assets/images/no-person/no-person.png'} />
                {(isEditable && <div className='overlay-image'>
                    <img src={`/assets/images/lapizBlanco/lapizBlanco.png`}
                        srcSet={`/assets/images/lapizBlanco/lapizBlanco.png 1x, /assets/images/lapizBlanco/lapizBlanco@2x.png 2x, /assets/images/lapizBlanco/lapizBlanco@3x.png 3x`} />
                </div>)}
            </figure>


            {(showName && <span>{user.name}</span>)}
        </div>
    );
};

export default ProfileImage;
