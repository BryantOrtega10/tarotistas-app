import axios from 'axios';
import { getSecureItem, hasSecureItem, removeSecureItem } from '../utils/SecureStorage';

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

let setModalFn: (() => void) | null = null;
let setErrorMessageFn: ((value: string) => void) | null = null;
let logoutFn: (() => void) | null = null;


export const setInterceptorHandlers = async (onModal: () => void, onLogout: () => void, onErrorMessage: (value: string) => void,) => {
    setModalFn = onModal;
    logoutFn = onLogout;
    setErrorMessageFn = onErrorMessage
};


AxiosInstance.interceptors.request.use(async (config) => {
    if (await hasSecureItem('access_token')) {
        const accessToken = await getSecureItem('access_token');
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            if (logoutFn) 
                logoutFn()
        }
        else{
            let errorMessage :string = "Error desconocido";
            if(typeof error.response.data.message === 'string'){
                errorMessage = error.response.data.message;
            }
            else if(typeof error.response.data.message === 'object' && error.response.data.message !== null){
                const firstMessage = Object.values(error.response.data.message)[0];
                if(typeof firstMessage === 'string'){
                    errorMessage = firstMessage
                }
            }
            else if(error.message){
                errorMessage = error.message
            }
            

            if (setErrorMessageFn) setErrorMessageFn(errorMessage);
            if (setModalFn) setModalFn();
        }
        return Promise.reject(error);
    }
);



export default AxiosInstance;