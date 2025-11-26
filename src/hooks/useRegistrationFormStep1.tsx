import { useState } from "react";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { useLoadingContext } from "../context/LoadingContext";
import { AuthService } from "../service/AuthService";
import { RegistrationForm1 } from "../interfaces/RegistrationForms";
import { useHistory } from "react-router";
import { setSecureItem } from "../utils/SecureStorage";
import { useAuth } from "../context/AuthContext";

export function useRegistrationFormStep1() {
    const history = useHistory();
    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();
    const auth = useAuth();

    const [form, setForm] = useState<RegistrationForm1>({
        nombre: "",
        correo: "",
        pass: "",
        r_pass: "",
        image: ""
    });

    const validateForm = () => {

        if (!form.nombre) return { valid: false, message: "El nombre es requerido" };
        if (!form.correo) return { valid: false, message: "El correo es requerido" };
        if (!form.pass) return { valid: false, message: "La contraseña es requerida" };
        if (!form.r_pass) return { valid: false, message: "Repetir la contraseña es requerida" };
        if (form.pass != form.r_pass) return { valid: false, message: "Las contraseñas no coinciden" };
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
            const { success, data } = await AuthService.postRegister({
                nombre: form.nombre,
                email: form.correo,
                password: form.pass,
                repeatPassword: form.r_pass,
                image: form.image
            });
            if (!success) return false;

            setIsLoading(false);
            await setSecureItem('access_token', data.token);
            auth.login(data.user)
            history.replace('/register/step2');

        } catch (err: any) {
            setErrorMessage(err.message ?? "Error desconocido");
            setShowModal(true);
            setIsLoading(false);
            return false;
        }
    }



    const handleChangeForm = (e: any) => {
        const input = e.target as HTMLInputElement;
        const name = input.name;
        const value = e.detail.value || "";
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSetImage = (value: string) => {
        setForm(prev => ({ ...prev, image: value }));
    };

    return {
        handleContinueForm,
        form,
        handleChangeForm,
        handleSetImage,
    }
}