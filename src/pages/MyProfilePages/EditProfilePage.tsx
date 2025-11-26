import { IonContent, IonHeader, IonIcon, IonPage } from '@ionic/react';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import './MyProfileHomePage.css'

const EditProfilePage: React.FC = () => {


    return (
        <IonPage>
            <IonHeader class='ion-no-border padding-header'>
                <CustomBackButton>Editar perfil</CustomBackButton>
            </IonHeader>
            <IonContent fullscreen className='padding-container-all'>
                
                <ProfileImage isEditable user={{ name: "Andres Carvajal", image: '/assets/images/test-person1.png' }} />
                <CustomTextInput label='Nombre' value={`Andres Martinez Carvajal`} />
                <CustomTextInput label='Correo' value={`Andres1@gmail.com`} />
                <CustomTextInput label='Fecha de nacimiento' value={`1980-07-11`} type='date' />
                <CustomTextInput label='Contraseña' type='password'/>
                <CustomTextInput label='Repita la contraseña' type='password'/>
                <div>
                    <CustomButton variant='purple-outline'>Cancelar</CustomButton>
                    <CustomButton variant='purple'>Guardar cambios</CustomButton>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default EditProfilePage;
