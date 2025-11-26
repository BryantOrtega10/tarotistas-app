import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import './Registration.css'
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomProgress from '../../components/CustomProgress/CustomProgress';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/AuthContext';
const RegistrationStep3Page: React.FC = () => {

    const history = useHistory();
    const { login } = useAuth();

    const handleContinue = () => {
        login({name: 'Andres Carvajal', image: '/assets/images/test-person1.png'})
        history.push('/home');
    }

    return (
        <IonPage>
            <IonHeader className='ion-no-border padding-header'>
                <CustomBackButton className='mb-3'>Registrate</CustomBackButton>
                <CustomProgress step={3} total={3} />
            </IonHeader>
            <IonContent fullscreen className='padding-container'>
                <div className='register-form-container'>
                    <CustomSelect label='Banco' placeholder='Selecciona tu banco' />
                    <CustomTextInput label='Número de la cuenta' placeholder='Número de la cuenta' type='number' />
                    <CustomSelect label='Tipo de cuenta' placeholder='Tipo de cuenta' />
                </div>
            </IonContent>
            <IonFooter className='footer-buttons padding-footer'>
                <CustomButton onClick={handleContinue} variant='transparent' style={{ marginBottom: '0.5rem' }}>Omitir</CustomButton>
                <CustomButton onClick={handleContinue}>Continuar</CustomButton>
            </IonFooter>
        </IonPage>
    );
};

export default RegistrationStep3Page;
