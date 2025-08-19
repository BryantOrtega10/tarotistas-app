import { IonContent, IonFooter, IonPage } from '@ionic/react';
import './Registration.css'
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomProgress from '../../components/CustomProgress/CustomProgress';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
const RegistrationStep3Page: React.FC = () => {



    return (
        <IonPage>
            <IonContent fullscreen className='padding-container'>
                <h1>Registrate</h1>
                <CustomProgress step={3} total={3} />
                <div className='register-form-container'>
                    <CustomSelect label='Banco' placeholder='Selecciona tu banco' />
                    <CustomTextInput label='Número de la cuenta' placeholder='Número de la cuenta' type='number' />
                    <CustomSelect label='Tipo de cuenta' placeholder='Tipo de cuenta' />
                </div>
            </IonContent>
            <IonFooter className='footer-buttons'>
                <CustomButton variant='transparent' style={{marginBottom: '0.5rem'}}>Omitir</CustomButton>
                <CustomButton>Continuar</CustomButton>
            </IonFooter>
        </IonPage>
    );
};

export default RegistrationStep3Page;
