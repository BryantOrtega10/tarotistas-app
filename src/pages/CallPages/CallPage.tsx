
import { useState } from 'react';
import { Call } from '../../types/models/Call';
import './CallPages.css'
import { IonButton, IonContent, IonFooter, IonHeader, IonImg, IonPage } from '@ionic/react';
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router';


const CallPage: React.FC = () => {

    const call: Call = {
        client: {
            id: 1,
            user: { name: 'Andres', image: '' },
            birthDate: '10 de octubre de 1994'
        },
        idCall: 1
    }

    const { loggedInUser } = useAuth();
    const [receiverBorder, setReceiverBorder] = useState<number>(0) //max: 25
    const [transmitterBorder, setTransmitterBorder] = useState<number>(0)

    const history = useHistory();
    const handleHangUp = () => {
        history.goBack();
    }

    return (
        <IonPage className='call-page'>
            <IonHeader className='ion-no-border call-header'>
                <h1 className='call-title'>Llamada con {call.client.user.name}</h1>
                <div className='birth-date-container'>
                    <span>Fecha de nacimiento</span>
                    <span className='birth-date-user'>{call.client.birthDate}</span>
                </div>
            </IonHeader>
            <IonContent className='padding-container-all call-content'>
                <section className='call-main'>
                    <div className='receiver-image' style={{ borderWidth: receiverBorder }}>
                        <IonImg src={call.client.user.image ? call.client?.user.image : '/assets/images/no-person/no-person.png'} />
                    </div>

                    <div className='transmitter-container'>
                        <div className='transmitter-image' style={{ borderWidth: transmitterBorder }}>
                            <IonImg src={loggedInUser?.image ? loggedInUser.image : '/assets/images/no-person/no-person.png'} />
                        </div>
                    </div>
                </section>
            </IonContent>
            <IonFooter class='ion-no-border call-footer'>
                <IonButton className='btn-microphone' color="light">
                    <img src={`/assets/images/microfono/microfono.png`}
                    srcSet={`
                                /assets/images/microfono/microfono.png 1x,
                                /assets/images/microfono/microfono@2x.png 2x,
                                /assets/images/microfono/microfono@3x.png 3x
                            `}
                    className='microfono' />
                </IonButton>
                <IonButton className='btn-hang-up' color="danger" onClick={handleHangUp}>
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
