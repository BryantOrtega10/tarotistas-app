import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage } from '@ionic/react';

import './ModifyAccountPage.css'
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomModalSheet from '../../components/CustomModalSheet/CustomModalSheet';
import { useModifyAccount } from '../../hooks/useModifyAccount';
import { closeOutline } from 'ionicons/icons';




const ModifyAccountPage: React.FC = () => {

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
        setShowOkModal
    } = useModifyAccount();

    return (
        <IonPage>
            <IonHeader class='ion-no-border padding-header'>
                <CustomBackButton>Modificar Cuenta</CustomBackButton>
            </IonHeader>
            <IonContent fullscreen className='padding-container-all'>
                <CustomSelect label='Banco' placeholder='Selecciona tu banco' options={bancos} onChangeVal={setBanco} value={JSON.stringify([form.banco])} />
                <CustomTextInput label='Número de la cuenta' placeholder='Número de la cuenta' type='number' name='cuenta' onIonInput={handleChangeForm} value={form.cuenta} />
                {showTipoCuenta && <CustomSelect label='Tipo de cuenta' placeholder='Tipo de cuenta' options={tiposCuenta} onChangeVal={setTipoCuenta} value={JSON.stringify([form.tipoCuenta])} />}


                <br /><br /><br />
            </IonContent>
            <IonFooter className='footer-buttons' >
                <CustomButton variant='purple' onClick={handleContinueForm}>Guardar cambios</CustomButton>
            </IonFooter>
            <CustomModalSheet
                isOpen={showOkModal}
                onDidDismiss={() => setShowOkModal(false)}
            >
                <div className='close-x'>
                    <IonButton onClick={() => setShowOkModal(false)} fill='clear'>
                        <IonIcon icon={closeOutline} />
                    </IonButton>
                </div>
                <h3>Datos actualizados!</h3>
                <p>Has actualizado los datos de tu cuenta satisfactoriamente</p>
                <CustomButton onClick={() => setShowOkModal(false)} variant='purple-outline'>
                    Cerrar
                </CustomButton>
            </CustomModalSheet>
        </IonPage>
    );
};

export default ModifyAccountPage;
