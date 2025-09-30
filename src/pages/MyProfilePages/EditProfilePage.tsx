import { IonContent, IonIcon, IonPage } from '@ionic/react';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import './MyProfileHomePage.css'

const EditProfilePage: React.FC = () => {


    return (
        <IonPage>
            <IonContent fullscreen className='padding-container-all'>
                <CustomBackButton>Editar perfil</CustomBackButton>
                <ProfileImage isEditable user={{ name: "Andres Carvajal", image: '' }} />
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
