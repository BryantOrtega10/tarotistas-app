import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import './Registration.css'
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomProgress from '../../components/CustomProgress/CustomProgress';
import CustomPhotoSelector from '../../components/CustomPhotoSelector/CustomPhotoSelector';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import { useRegistrationFormStep1 } from '../../hooks/useRegistrationFormStep1';

const RegistrationStep1Page: React.FC = () => {

    const { handleContinueForm, form, handleChangeForm, handleSetImage } = useRegistrationFormStep1()

    return (
        <IonPage>
            <IonHeader className='ion-no-border padding-header'>
                <CustomBackButton className='mb-3'>Registrate</CustomBackButton>
                <CustomProgress step={1} total={3} />
            </IonHeader>
            <IonContent fullscreen className='padding-container'>
                <div className='register-form-container'>
                    <CustomTextInput label='Nombre' placeholder='Escrite tu nombre' name='nombre' onIonInput={handleChangeForm} value={form.nombre} />
                    <CustomTextInput label='Correo' placeholder='Escrite tu correo electrónico' type='email' name='correo' onIonInput={handleChangeForm} value={form.correo} />
                    <CustomTextInput label='Contraseña' placeholder='Ingresa tu contraseña' type='password' name='pass' onIonInput={handleChangeForm} value={form.pass} />
                    <CustomTextInput label='Repetir contraseña' placeholder='Repite tu contraseña' type='password' name='r_pass' onIonInput={handleChangeForm} value={form.r_pass} />
                    <CustomPhotoSelector value={form.image} onChange={handleSetImage} label='Foto de perfil'></CustomPhotoSelector>
                </div>
            </IonContent>
            <IonFooter className='footer-buttons padding-footer'>
                <CustomButton onClick={handleContinueForm}>Continuar</CustomButton>
            </IonFooter>
        </IonPage>
    );
};

export default RegistrationStep1Page;
