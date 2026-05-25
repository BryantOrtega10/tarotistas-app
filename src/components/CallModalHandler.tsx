import { useEffect, useState } from 'react';
import { useErrorHandlerContext } from '../context/ErrorHandlerContext';
import { setInterceptorHandlers } from '../service/AxiosInstance';
import { useHistory } from 'react-router';
import CustomModalSheet from './CustomModalSheet/CustomModalSheet';
import CustomButton from './CustomButton/CustomButton';
import { IonButton, IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { useNotificationContext } from '../context/NotificationContext';
import { useLoadingContext } from '../context/LoadingContext';
import { CallService } from '../service/CallService';
import { User } from '../models/User.model';

const CallModalHandler = () => {

    const { callNotification, setCallNotification } = useNotificationContext()
    const [showModal, setShowModal] = useState<boolean>(false);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const { setIsLoading } = useLoadingContext()
    const history = useHistory();

    useEffect(() => {
        if (callNotification == null) return;
        if (callNotification.accion === "solicitar") {
            setSecondsLeft(90)
            setShowModal(true)
        }
        if (callNotification.accion === "cancelada") {
            cleanNotification()
        }

    }, [history, callNotification]);

    useEffect(() => {
        if (secondsLeft <= 0) {
            const rejectCallByTime = async () => {
                if (callNotification) {
                    const idLlamada = callNotification.llamada_id;
                    try {
                        CallService.postRejectCall(idLlamada);
                        cleanNotification()
                    } catch (err: any) {
                        console.log(err)
                        return false;
                    }
                }
            }
            rejectCallByTime()
            return;
        }

        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    const handleAcceptCall = async () => {
        if (callNotification) {
            const idLlamada = callNotification.llamada_id;
            try {
                const { success, data } = await CallService.postAcceptCall(idLlamada);
                setIsLoading(false);
                if (!success) {
                    cleanNotification()
                    return false;
                }
                cleanNotification()
                history.replace(`/call/${data.llamada.id}`)

            } catch (err: any) {
                setIsLoading(false);
                cleanNotification()
                return false;
            }
        }
    }

    const handleRejectCall = async () => {
        if (callNotification) {
            const idLlamada = callNotification.llamada_id;
            try {
                const { success, data } = await CallService.postRejectCall(idLlamada);
                setIsLoading(false);
                if (!success) {
                    cleanNotification()
                    return false;
                }
                cleanNotification()
            } catch (err: any) {
                setIsLoading(false);
                cleanNotification()
                return false;
            }
        }
    }

    const cleanNotification = () => {
        setSecondsLeft(0)
        setCallNotification(null);
        setShowModal(false)
    }

    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
        const user = JSON.parse(userData) as User
        if (user.status === 3) {
            return (
                <CustomModalSheet
                    isOpen={showModal}
                    onDidDismiss={handleRejectCall}
                >
                    <div className='close-x'>
                        <IonButton onClick={handleRejectCall} fill='clear'>
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </div>
                    <h3>Llamada entrante</h3>
                    <p>Tienes una llamada entrante. Responde antes de {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, '0')}</p>
                    <CustomButton onClick={handleAcceptCall} variant='purple'>
                        Aceptar llamada
                    </CustomButton>
                    <CustomButton onClick={handleRejectCall} variant='purple-outline'>
                        Cancelar
                    </CustomButton>
                </CustomModalSheet>
            );
        }
    }
    return <></>

};

export default CallModalHandler;
