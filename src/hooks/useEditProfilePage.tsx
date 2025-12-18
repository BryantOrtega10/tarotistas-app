import { useEffect, useState } from "react";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { useLoadingContext } from "../context/LoadingContext";
import { AuthService } from "../service/AuthService";
import { RegistrationForm1 } from "../interfaces/RegistrationForms";
import { useHistory } from "react-router";
import { setSecureItem } from "../utils/SecureStorage";
import { useAuth } from "../context/AuthContext";
import { EditProfileForm } from "../interfaces/EditProfileForm";
import { ListasService } from "../service/ListasService";
import { PerfilService } from "../service/PerfilService";

export function useEditProfilePage() {
    const history = useHistory();
    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();
    const auth = useAuth();
    const [paises, setPaises] = useState<{ value: number, text: string }[]>([]);
    const [especialidades, setEspecialidades] = useState<{ value: number, text: string }[]>([]);
    const [showOkModal, setShowOkModal] = useState<boolean>(false);
    const [form, setForm] = useState<EditProfileForm>({
        image: "",
        nombre: "",
        correo: "",
        anios: "",
        pais: "",
        especialidades: [],
        hora_i: "",
        hora_f: "",
        descripcion: "",
    });


    useEffect(() => {
        const populateArrays = async () => {
            try {
                const { success, data } = await ListasService.getPaises()
                if (success) {
                    const parseData = data.paises.map((item) => { return { value: item.id, text: item.nombre } })
                    setPaises(parseData)
                }
            } catch (error: any) {
                console.log("Error al consultar paises", error)
            }

            try {
                const { success, data } = await ListasService.getEspecialidades()
                if (success) {
                    const parseData = data.especialidades.map((item) => { return { value: item.id, text: item.nombre } })
                    setEspecialidades(parseData)
                }
            } catch (error: any) {
                console.log("Error al consultar especialidades", error)
            }

            try {
                const { success, data } = await PerfilService.getMiPerfil()
                if (success) {
                    setForm({
                        image: "",
                        nombre: data.nombre,
                        correo: data.email,
                        anios: data.anios_exp,
                        pais: data.pais_id,
                        especialidades: data.especialidades.map((item) => item.id),
                        hora_i: data.horario_inicio,
                        hora_f: data.horario_fin,
                        descripcion: data.descripcion_corta
                    });
                }
            } catch (error: any) {
                console.log("Error al consultar mi perfil", error)
            }



        }
        populateArrays()
    }, [])


    const validateForm = () => {

        if (!form.nombre) return { valid: false, message: "El nombre es requerido" };
        if (!form.correo) return { valid: false, message: "El correo es requerido" };

        if (!form.pais) return { valid: false, message: "El pais es requerido" };
        if (form.especialidades.length === 0) return { valid: false, message: "Selecciona al menos una especialidad" };

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

            const { success, data } = await PerfilService.putActualizarPerfil({
                nombre: form.nombre,
                email: form.correo,
                aniosExp: form.anios,
                descripcionCorta: form.descripcion,
                especialidades: form.especialidades.map((val) => { return { id: val } }),
                horarioFin: form.hora_f,
                horarioInicio: form.hora_i,
                pais: form.pais,
                photo: form.image
            });
            if (!success) { setIsLoading(false); return false; }

            setIsLoading(false);

            const newUserData = { ...auth.loggedInUser! }
            newUserData.name = form.nombre
            newUserData.photo = data.photo
            
            auth.updateUser(newUserData)
            setShowOkModal(true)

        } catch (err: any) {
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

    const setPais = (value: string) => {
        setForm(prev => ({ ...prev, pais: value }));
    }

    const setEspecialidadesSel = (value: string) => {
        const especialidadesSel: number[] = JSON.parse(value)
        setForm(prev => ({ ...prev, especialidades: especialidadesSel }));
    }

    return {
        handleContinueForm,
        form,
        handleChangeForm,
        handleSetImage,
        paises,
        especialidades,
        setPais,
        setEspecialidadesSel,
        showOkModal, 
        setShowOkModal
    }
}