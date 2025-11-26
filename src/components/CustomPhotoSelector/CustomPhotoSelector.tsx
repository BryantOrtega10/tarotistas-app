import { IonRippleEffect } from '@ionic/react';
import './CustomPhotoSelector.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';

type CustomPhotoSelectorProps = {
    label?: string;
    value: string;
    previewImg?: string;
    onChange: (value: string) => void;
};

const CustomPhotoSelector: React.FC<CustomPhotoSelectorProps> = ({
    label,
    value,
    previewImg = '',
    onChange,
}) => {

    const [imageType, setImageType] = useState<string>("portrait");

    const takePicture = async () => {
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

    const handleGetPhoto = () => {
        takePicture();
    }

    const componentImagePick = () => {
        if (value === "" && previewImg === "") {
            return <div className='photo-select-container ion-activatable ripple-parent' onClick={handleGetPhoto}>
                <IonRippleEffect></IonRippleEffect>
                <div className='no-image'>
                    <img src={`/assets/images/no-image/no-image.png`}
                        srcSet={`
                                /assets/images/no-image/no-image.png 1x,
                                /assets/images/no-image/no-image@2x.png 2x,
                                /assets/images/no-image/no-image@3x.png 3x
                            `}
                        className='no-image' data-testid="no-image" />
                    <span>Subir una imagen <img src={`/assets/images/upload/upload.png`}
                        srcSet={`
                                /assets/images/upload/upload.png 1x,
                                /assets/images/upload/upload@2x.png 2x,
                                /assets/images/upload/upload@3x.png 3x
                            `}
                        className='upload' /></span>
                </div>
            </div>
        }
        else if (value !== "") {
            return <div className='preview-select-photo-container ion-activatable ripple-parent' onClick={handleGetPhoto}>
                <IonRippleEffect></IonRippleEffect>
                <div className='image-selected'>
                    <figure className='preview-image'>
                        <img src={"data:image/jpeg;base64, " + value} className={`preview-image-${imageType}`} data-testid="img-displayed" />
                    </figure>
                    <span>Cambiar la imagen <img src={`/assets/images/upload/upload.png`}
                        srcSet={`
                                /assets/images/upload/upload.png 1x,
                                /assets/images/upload/upload@2x.png 2x,
                                /assets/images/upload/upload@3x.png 3x
                            `}
                        className='upload' /></span>
                </div>
            </div>
        }

    }

    return (
        <div className='custom-photo-selector-container'>
            {label && <label className="photo-label">{label}</label>}
            {componentImagePick()}

        </div>
    );
};

export default CustomPhotoSelector;
