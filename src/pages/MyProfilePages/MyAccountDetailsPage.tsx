import { IonContent, IonHeader, IonIcon, IonPage } from '@ionic/react';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import './MyProfileHomePage.css'
import { useHistory } from 'react-router';

const MyAccountDetailsPage: React.FC = () => {

    const history = useHistory();

    const handleEditMyProfile = () => {
        history.push('/my-profile/edit')
    }

    return (
        <IonPage>
            <IonHeader class='ion-no-border padding-header'>
                <CustomBackButton>Detalles de la cuenta</CustomBackButton>
            </IonHeader>
            <IonContent fullscreen className='padding-container-all'>
                
                <ProfileImage showName user={{ name: "Andres Carvajal", image: '/assets/images/test-person1.png' }} />
                <CustomTextInput label='Nombre' readonly>Andres Martinez Carvajal</CustomTextInput>
                <CustomTextInput label='Correo' readonly>Andres1@gmail.com</CustomTextInput>
                <CustomTextInput label='Fecha de nacimiento' readonly>11/07/1980</CustomTextInput>
                <CustomTextInput label='Contraseña' readonly className='last-item'>*************</CustomTextInput>
                <CustomButton variant='transparent' className='text-underline' onClick={handleEditMyProfile}>
                    <img src={`/assets/images/lapiz/lapiz.png`}
                        className='icon-lapiz'
                        srcSet={`/assets/images/lapiz/lapiz.png 1x, /assets/images/lapiz/lapiz@2x.png 2x, /assets/images/lapiz/lapiz@3x.png 3x`} /> 
                    Editar Perfil
                </CustomButton>
            </IonContent>
        </IonPage>
    );
};

export default MyAccountDetailsPage;
