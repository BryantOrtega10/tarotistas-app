import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonPage } from '@ionic/react';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import './MyProfileHomePage.css'
import { useAuth } from '../../context/AuthContext';
import { useEditProfilePage } from '../../hooks/useEditProfilePage';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import CustomModalSheet from '../../components/CustomModalSheet/CustomModalSheet';
import { closeOutline } from 'ionicons/icons';

const EditProfilePage: React.FC = () => {

    const { loggedInUser } = useAuth();

    const {
        handleContinueForm,
        form,
        handleChangeForm,
        handleSetImage,
        paises,
        especialidades,
        setPais,
        setEspecialidadesSel,
        showOkModal, 
        setShowOkModal,
    } = useEditProfilePage()



    return (
        <IonPage>
            <IonHeader class='ion-no-border padding-header'>
                <CustomBackButton>Editar perfil</CustomBackButton>
            </IonHeader>
            <IonContent fullscreen className='padding-container-all'>

                <ProfileImage isEditable user={loggedInUser!} value={form.image} onChange={handleSetImage} />
                <CustomTextInput label='Nombre' placeholder='Escrite tu nombre' name='nombre' onIonInput={handleChangeForm} value={form.nombre} />
                <CustomTextInput label='Correo' placeholder='Escrite tu correo electrónico' type='email' name='correo' onIonInput={handleChangeForm} value={form.correo} />
                <CustomTextInput label='Años de experiencia' placeholder='Número de años de experiencia' type='number' name='anios' onIonInput={handleChangeForm} value={form.anios} />
                <CustomSelect label='País' placeholder='Ingresa tu país de residencia' options={paises} onChangeVal={setPais} value={JSON.stringify([parseInt(form.pais)])} />
                <CustomSelect label='Selecciona tus mejores actitudes' placeholder='Especialidades (cuales son tus mayores aptitudes)' multiple options={especialidades} onChangeVal={setEspecialidadesSel} value={JSON.stringify(form.especialidades)} />
                <CustomTextInput label='¿Cuál sería tu hora de inicio de trabajo?' placeholder='Hora inicio de trabajo' type='time' name='hora_i' onIonInput={handleChangeForm} value={form.hora_i} />
                <CustomTextInput label='¿Cuál sería tu hora de fin de trabajo?' placeholder='Hora fin de trabajo' type='time' name='hora_f' onIonInput={handleChangeForm} value={form.hora_f} />
                <CustomTextArea label='Escribe una descripción corta sobre ti' placeholder='Escribe una descripción' name='descripcion' onIonInput={handleChangeForm} value={form.descripcion} />

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

export default EditProfilePage;
