import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage } from '@ionic/react';
import './Registration.css'
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomProgress from '../../components/CustomProgress/CustomProgress';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useRegistrationFormStep3 } from '../../hooks/useRegistrationFormStep3';
import CustomModalSheet from '../../components/CustomModalSheet/CustomModalSheet';
import { closeOutline } from 'ionicons/icons';
const RegistrationStep3Page: React.FC = () => {

    const {
        handleContinueForm,
        form,
        handleChangeForm,
        setBanco,
        setTipoCuenta,
        bancos,
        tiposCuenta,
        showTipoCuenta,
        showOkModal,
        setShowOkModal,
        handleDismissOkModal,
        handleSkipForm
    } = useRegistrationFormStep3();

    return (
        <IonPage>
            <IonHeader className='ion-no-border padding-header'>
                <CustomBackButton className='mb-3'>Registrate</CustomBackButton>
                <CustomProgress step={3} total={3} />
            </IonHeader>
            <IonContent fullscreen className='padding-container'>
                <div className='register-form-container'>
                    <CustomSelect label='Banco' placeholder='Selecciona tu banco' options={bancos} onChangeVal={setBanco} value={JSON.stringify([form.banco])} />
                    <CustomTextInput label='Número de la cuenta' placeholder='Número de la cuenta' type='number' name='cuenta' onIonInput={handleChangeForm} value={form.cuenta} />
                    {showTipoCuenta && <CustomSelect label='Tipo de cuenta' placeholder='Tipo de cuenta' options={tiposCuenta} onChangeVal={setTipoCuenta} value={JSON.stringify([form.tipoCuenta])} />}
                </div>
            </IonContent>
            <IonFooter className='footer-buttons padding-footer'>
                <CustomButton onClick={handleSkipForm} variant='transparent' style={{ marginBottom: '0.5rem' }}>Omitir</CustomButton>
                <CustomButton onClick={handleContinueForm}>Continuar</CustomButton>
            </IonFooter>
            <CustomModalSheet
                isOpen={showOkModal}
                onDidDismiss={handleDismissOkModal}
            >
                <div className='close-x'>
                    <IonButton onClick={() => setShowOkModal(false)} fill='clear'>
                        <IonIcon icon={closeOutline} />
                    </IonButton>
                </div>
                <h3>Vamos a validar tu cuenta!</h3>
                <p>Vamos a validar tu cuenta, vuelve a intentar ingresar mas tarde.</p>
                <CustomButton onClick={() => setShowOkModal(false)} variant='purple-outline'>
                    Cerrar
                </CustomButton>
            </CustomModalSheet>
        </IonPage>
    );
};

export default RegistrationStep3Page;
