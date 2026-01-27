
import { useState } from 'react';
import { Call } from '../../types/models/Call';
import './CallPages.css'
import { IonButton, IonContent, IonFooter, IonHeader, IonImg, IonPage } from '@ionic/react';
import { useAuth } from '../../context/AuthContext';
import { useHistory, useParams } from 'react-router';
import { useCallPage } from '../../hooks/useCallPage';
import CustomModalSheet from '../../components/CustomModalSheet/CustomModalSheet';
import CustomButton from '../../components/CustomButton/CustomButton';


const CallPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const {
        status,
        currentCall,
        receiverBorder,
        transmitterBorder,
        showStartCall,
        isMuted,
        muteMic,
        unmuteMic,
        handleStartCall,
        colgar,
    } = useCallPage(parseInt(id))

    const { loggedInUser } = useAuth();

    return (
        <IonPage className='call-page'>
            <IonHeader className='ion-no-border call-header'>
                <h1 className='call-title'>Llamada con {currentCall?.cliente_tarotista?.cliente?.user?.name}</h1>
                <div className='birth-date-container'>
                    <span>Fecha de nacimiento</span>
                    <span className='birth-date-user'>{currentCall?.cliente_tarotista?.cliente?.fecha_nacimiento}</span>
                </div>
            </IonHeader>
            <IonContent className='padding-container-all call-content'>
                <section className='call-main'>
                    <div className='receiver-image' style={{ borderWidth: receiverBorder }}>
                        <IonImg src={currentCall?.cliente_tarotista?.cliente?.user?.photo ?
                            `${import.meta.env.VITE_API_BASE_URL}storage/users/${currentCall.cliente_tarotista.cliente.user.photo}`
                            : '/assets/images/no-person/no-person.png'} />
                    </div>

                    <div className='transmitter-container'>
                        <div className='transmitter-image' style={{ borderWidth: transmitterBorder }}>
                            <IonImg src={loggedInUser?.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${loggedInUser.photo}` : '/assets/images/no-person/no-person.png'} />
                        </div>
                    </div>
                </section>

                <CustomModalSheet
                    isOpen={showStartCall}
                    backdropDismiss={false}
                >
                    <h3>Nueva llamada</h3>
                    <p>Todo listo? Cuando quieras haz click en iniciar llamada para iniciar la conexion</p>
                    <CustomButton onClick={handleStartCall} variant='purple-outline'>
                        Iniciar llamada
                    </CustomButton>
                </CustomModalSheet>

            </IonContent>
            <IonFooter class='ion-no-border call-footer'>
                {!isMuted &&
                    <IonButton className='btn-microphone' color="light" onClick={muteMic}>
                        <img src={`/assets/images/microfono/microfono.png`}
                            srcSet={`
                                /assets/images/microfono/microfono.png 1x,
                                /assets/images/microfono/microfono@2x.png 2x,
                                /assets/images/microfono/microfono@3x.png 3x
                            `}
                            className='microfono' />
                    </IonButton>
                }
                {isMuted && <IonButton className='btn-microphone btn-mute-microphone' color="light" onClick={unmuteMic}>
                    <img src={`/assets/images/mute-microfono/mute-microfono.png`}
                        srcSet={`
                                /assets/images/mute-microfono/mute-microfono.png 1x,
                                /assets/images/mute-microfono/mute-microfono@2x.png 2x,
                                /assets/images/mute-microfono/mute-microfono@3x.png 3x
                            `}
                        className='microfono-apagado' />
                </IonButton>
                }
                <IonButton className='btn-hang-up' color="danger" onClick={colgar}>
                    <img src={`/assets/images/colgar/colgar.png`}
                        srcSet={`
                                /assets/images/colgar/colgar.png 1x,
                                /assets/images/colgar/colgar@2x.png 2x,
                                /assets/images/colgar/colgar@3x.png 3x
                            `}
                        className='colgar' />
                </IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default CallPage;
