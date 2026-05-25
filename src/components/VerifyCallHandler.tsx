import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { CallService } from '../service/CallService';
import { useAuth } from '../context/AuthContext';

const VerifyCallHandler = () => {

    const history = useHistory();
    const { loggedInUser } = useAuth();

    useEffect(() => {
        if (!loggedInUser) return;
        if(loggedInUser.status != 3) return;
        consultarLlamada();
        console.log("Consultando llamada");

    }, [loggedInUser])

    const consultarLlamada = async () => {
        try {
            const { success, data } = await CallService.getLlamadaActiva();
            if (success) {
                history.replace(`/call/${data.llamada.id}`)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    return <></>
};

export default VerifyCallHandler;
