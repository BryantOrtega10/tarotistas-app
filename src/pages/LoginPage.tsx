import { IonContent, IonPage } from '@ionic/react';
import './LoginPage.css';
import LoginHeader from '../components/LoginHeader/LoginHeader';
import CustomTextInput from '../components/CustomTextInput/CustomTextInput';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomLink from '../components/CustomLink/CustomLink';

import { useLoginForm } from '../hooks/useLoginForm';

const LoginPage: React.FC = () => {

    const { form, handleChangeForm, handleContinueForm, handleRegister, handleGoogleLogin } = useLoginForm()
    
    return (
        <IonPage>
            <IonContent fullscreen>
                <LoginHeader />
                <div className='login-form-container padding-container'>
                    <CustomTextInput label='Correo' placeholder='Ingresa tu correo' type='email' name='email' onIonInput={handleChangeForm} value={form.email} />
                    <CustomTextInput label='Contraseña' placeholder='Escrite tu contraseña' type='password' name='password' onIonInput={handleChangeForm} value={form.password} />
                    <CustomButton onClick={handleContinueForm}>Iniciar sesión</CustomButton>
                    <CustomButton variant='transparent' onClick={handleGoogleLogin}>Continuar con Google</CustomButton>
                    <div className='register-container'>
                        ¿No tienes cuenta? <CustomLink underline onClick={handleRegister}>Regístrate</CustomLink>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
