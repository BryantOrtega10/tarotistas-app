import { IonContent, IonPage } from '@ionic/react';
import './LoginPage.css';
import LoginHeader from '../components/LoginHeader/LoginHeader';
import CustomTextInput from '../components/CustomTextInput/CustomTextInput';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomLink from '../components/CustomLink/CustomLink';

const LoginPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <LoginHeader />
                <div className='login-form-container padding-container'>
                    <CustomTextInput label='Usuario' placeholder='Ingresa tu usuario o correo' />
                    <CustomTextInput label='Contraseña' placeholder='Escrite tu contraseña' type='password' />
                    <CustomButton>Iniciar sesión</CustomButton>
                    <CustomButton>Continuar con Google</CustomButton>
                    <CustomButton variant='transparent'>Continuar sin iniciar sesión</CustomButton>
                    <div className='register-container'>
                        ¿No tienes cuenta? <CustomLink underline>Regístrate</CustomLink>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
