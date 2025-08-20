import { IonContent, IonFooter, IonPage } from '@ionic/react';
import './Registration.css'
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomProgress from '../../components/CustomProgress/CustomProgress';
const RegistrationStep1Page: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen className='padding-container'>
                <h1 className='margen'>Registrate</h1>
                <CustomProgress step={1} total={3} />
                <div className='register-form-container'>
                    <CustomTextInput label='Nombre' placeholder='Escrite tu nombre' />
                    <CustomTextInput label='Correo' placeholder='Escrite tu correo electrónico' type='email' />
                    <CustomTextInput label='Contraseña' placeholder='Ingresa tu contraseña' type='password' />
                    <CustomTextInput label='Repetir contraseña' placeholder='Repite tu contraseña' type='password' />
                </div>
            </IonContent>
            <IonFooter className='footer-buttons'>
                <CustomButton>Continuar</CustomButton>
            </IonFooter>
        </IonPage>
    );
};

export default RegistrationStep1Page;
