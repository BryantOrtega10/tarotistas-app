import { IonContent, IonFooter, IonPage } from '@ionic/react';
import './Registration.css'
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomProgress from '../../components/CustomProgress/CustomProgress';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
const RegistrationStep2Page: React.FC = () => {

 

    return (
        <IonPage>
            <IonContent fullscreen className='padding-container'>
                <h1>Registrate</h1>
                <CustomProgress step={2} total={3} />
                <div className='register-form-container'>
                    <CustomTextInput label='Años de experiencia' placeholder='Número de años de experiencia' type='number' />
                    <CustomSelect label='País' placeholder='Ingresa tu país de residencia' />
                    <CustomSelect label='Selecciona tus mejores actitudes' placeholder='Especialidades (cuales son tus mayores aptitudes)' multiple/>
                    <CustomTextInput label='¿Cuál sería tu hora de inicio de trabajo?' placeholder='Hora inicio de trabajo' type='time' />
                    <CustomTextInput label='¿Cuál sería tu hora de fin de trabajo?' placeholder='Hora fin de trabajo' type='time' />

                    <CustomTextArea label='Escribe una descripción corta sobre ti' placeholder='Escribe una descripción' />
                    
                </div>
            </IonContent>
            <IonFooter className='footer-buttons'>
                <CustomButton>Continuar</CustomButton>
            </IonFooter>
        </IonPage>
    );
};

export default RegistrationStep2Page;
