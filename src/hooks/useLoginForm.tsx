import { useState } from "react";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { useLoadingContext } from "../context/LoadingContext";
import { AuthService } from "../service/AuthService";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import { LoginForm } from "../interfaces/RegistrationForms";
import { setSecureItem } from "../utils/SecureStorage";

export function useLoginForm() {
    const history = useHistory();
    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();
    const { login } = useAuth();

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
                password: form.password
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

    return {
        handleContinueForm,
        form,
        handleChangeForm,
        handleRegister
    }
}