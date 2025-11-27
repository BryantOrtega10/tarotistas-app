import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import './Registration.css'
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomProgress from '../../components/CustomProgress/CustomProgress';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import { useRegistrationFormStep2 } from '../../hooks/useRegistrationFormStep2';

const RegistrationStep2Page: React.FC = () => {

    const {
        handleContinueForm,
        form,
        handleChangeForm,
        paises,
        setPais,
        especialidades,
        setEspecialidadesSel,
    } = useRegistrationFormStep2()

    return (
        <IonPage>
            <IonHeader className='ion-no-border padding-header'>
                <CustomBackButton className='mb-3'>Registrate</CustomBackButton>
                <CustomProgress step={2} total={3} />
            </IonHeader>
            <IonContent fullscreen className='padding-container'>
                <div className='register-form-container'>
                    <CustomTextInput label='Años de experiencia' placeholder='Número de años de experiencia' type='number' name='anios' onIonInput={handleChangeForm} value={form.anios} />
                    <CustomSelect label='País' placeholder='Ingresa tu país de residencia' options={paises} onChangeVal={setPais} value={JSON.stringify([parseInt(form.pais)])} />
                    <CustomSelect label='Selecciona tus mejores actitudes' placeholder='Especialidades (cuales son tus mayores aptitudes)' multiple options={especialidades} onChangeVal={setEspecialidadesSel} value={JSON.stringify(form.especialidades)} />
                    <CustomTextInput label='¿Cuál sería tu hora de inicio de trabajo?' placeholder='Hora inicio de trabajo' type='time' name='hora_i' onIonInput={handleChangeForm} value={form.hora_i} />
                    <CustomTextInput label='¿Cuál sería tu hora de fin de trabajo?' placeholder='Hora fin de trabajo' type='time' name='hora_f' onIonInput={handleChangeForm} value={form.hora_f} />
                    <CustomTextArea label='Escribe una descripción corta sobre ti' placeholder='Escribe una descripción' name='descripcion' onIonInput={handleChangeForm} value={form.descripcion} />
                    <br />
                    <br />
                    <br />
                </div>
            </IonContent>
            <IonFooter className='footer-buttons padding-footer'>
                <CustomButton onClick={handleContinueForm}>Continuar</CustomButton>
            </IonFooter>
        </IonPage>
    );
};

export default RegistrationStep2Page;
