import { useEffect } from 'react';
import { useErrorHandlerContext } from '../context/ErrorHandlerContext';
import { setInterceptorHandlers } from '../service/AxiosInstance';
import { useHistory } from 'react-router';
import CustomModalSheet from './CustomModalSheet/CustomModalSheet';
import CustomButton from './CustomButton/CustomButton';
import { useAuth } from '../context/AuthContext';

const GlobalHandler = () => {
    // Contexto para manejar errores globales (estado de modal y mensajes)
    const { showModal, setShowModal, errorMessage, setErrorMessage } = useErrorHandlerContext();

    // Contexto de autenticación (logout)
    const { logout } = useAuth();

    // React Router para navegación (aunque aquí solo se pasa como dependencia)
    const history = useHistory();

    /**
     * useEffect:
     * Configura interceptores globales de Axios al montar el componente.
     * - Si ocurre un error → muestra modal
     * - Si se recibe 401 (o similar) → ejecuta logout
     * - Si hay un mensaje de error → lo guarda en el estado global
     */
    useEffect(() => {
        if(logout == null) return;  // Evita ejecutar si logout aún no está definido

        const loadFunctions = async () => {
            await setInterceptorHandlers(
                () => setShowModal(true),           // Mostrar modal de error
                async () => await logout(),         // Logout automático en error crítico
                (value: string) => setErrorMessage(value) // Guardar mensaje de error
            );
        }

        loadFunctions();
    }, [history, setShowModal, logout]); 
    // Dependencias: history, funciones de estado y logout

    /**
     * Renderiza un modal de error global.
     * Se abre cuando `showModal` es true.
     * Contiene el mensaje de error y un botón para cerrarlo.
     */
    return (
        <CustomModalSheet
            isOpen={showModal}
            onDidDismiss={() => setShowModal(false)}
            icon='error'
        >
            <b>{errorMessage}</b>
            <CustomButton onClick={() => setShowModal(false)} variant='white'>
                Cerrar
            </CustomButton>
        </CustomModalSheet>
    );
};

export default GlobalHandler;
