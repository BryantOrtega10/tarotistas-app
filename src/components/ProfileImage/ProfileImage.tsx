import { IonImg } from '@ionic/react';
import './ProfileImage.css';
import { User } from '../../models/User.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';

export type ProfileImageProps = {
    user: User;
    showName?: boolean
    isEditable?: boolean,
    value?: string;
    onChange?: (value: string) => void;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ user, showName = false, isEditable = false, value, onChange = () => {} }) => {


    const [imageType, setImageType] = useState<string>("portrait");

    const takePicture = async () => {
        if(!isEditable) return false;

        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            source: CameraSource.Camera,
            resultType: CameraResultType.Base64
        });
        if (image.base64String) {
            onChange(image.base64String);
            const img = new Image();
            img.src = "data:image/jpeg;base64," + image.base64String;
            img.onload = () => {
                if (img.width > img.height) {
                    setImageType("landscape");
                } else {
                    setImageType("portrait");
                }
            };
        }

    };

    return (
        <div className={`profile-image-container`}>
            <figure onClick={takePicture}>
                <IonImg src={ value ? `data:image/jpeg;base64,${value}` :                    
                    user.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${user.photo}` : 
                    '/assets/images/no-person/no-person.png'} className={`preview-image-${imageType}`} />
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
