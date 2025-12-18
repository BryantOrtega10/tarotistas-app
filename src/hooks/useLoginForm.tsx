import { useState } from "react";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { useLoadingContext } from "../context/LoadingContext";
import { AuthService } from "../service/AuthService";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import { LoginForm } from "../interfaces/RegistrationForms";
import { setSecureItem } from "../utils/SecureStorage";
import { useNotificationContext } from "../context/NotificationContext";
import { useGoogleAuth } from "../context/GoogleAuthContext";

export function useLoginForm() {
    const history = useHistory();
    const { tokenFirebase } = useNotificationContext();
    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();
    const { login } = useAuth();
    const googleAuth = useGoogleAuth();

    

    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: ""
    });
    const validateForm = () => {

        if (!form.email) return { valid: false, message: "El email es requerido" };
        if (!form.password) return { valid: false, message: "La contraseña es requerida" };

        return { valid: true };
    };



    const handleContinueForm = async () => {
        const validation = validateForm();
        if (!validation.valid) {
            setErrorMessage(validation.message ?? "Error desconocido");
            setShowModal(true);
            return false;
        }
        setIsLoading(true);
        try {
            const { success, data } = await AuthService.postLogin({
                email: form.email,
                password: form.password,
                tokenPush: tokenFirebase ?? ""
            });
            if (!success) { 
                setIsLoading(false); 
                return false; 
            }
                      
            login(data.user)
            await setSecureItem('access_token', data.token);
            setIsLoading(false);
            if(data.user.status === 1){
                history.replace('/register/step2');
            }
            if(data.user.status === 3){
                history.replace('/home');
            }
            
        } catch (err: any) {
            setIsLoading(false);
            return false;
        }
    }

    const handleRegister = () => {
        history.push('/register/step1');
    }
    const handleChangeForm = (e: any) => {
        const input = e.target as HTMLInputElement;
        const name = input.name;
        const value = e.detail.value || "";
        setForm(prev => ({ ...prev, [name]: value }));
    };


    const handleGoogleLogin = async () => {
        
        const userData = await googleAuth.login();

        setIsLoading(true);
        try {
            const { success, data } = await AuthService.postSocialLogin({
                email: userData.email,
                name: userData.name,
                provider: 'google',
                provider_id: userData.token,                
                tokenPush: tokenFirebase ?? ""
            });
            if (!success) { 
                setIsLoading(false); 
                return false; 
            }
                      
            login(data.user)
            await setSecureItem('access_token', data.token);
            setIsLoading(false);
            if(data.user.status === 1){
                history.replace('/register/step2');
            }
            if(data.user.status === 3){
                history.replace('/home');
            }
            
        } catch (err: any) {
            setIsLoading(false);
            return false;
        }
    }


    return {
        handleContinueForm,
        form,
        handleChangeForm,
        handleRegister,
        handleGoogleLogin
    }
}