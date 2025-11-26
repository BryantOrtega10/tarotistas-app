import { useEffect, useState } from "react";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { useLoadingContext } from "../context/LoadingContext";
import { AuthService } from "../service/AuthService";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import { RegistrationForm2 } from "../interfaces/RegistrationForms";
import { ListasService } from "../service/ListasService";
import { PerfilService } from "../service/PerfilService";


export function useRegistrationFormStep2() {
    const history = useHistory();
    const [paises, setPaises] = useState<{ value: number, text: string }[]>([]);
    const [especialidades, setEspecialidades] = useState<{ value: number, text: string }[]>([]);
    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();
    const auth = useAuth();

    const [form, setForm] = useState<RegistrationForm2>({
        anios: "",
        pais: "",
        especialidades: [],
        hora_i: "",
        hora_f: "",
        descripcion: ""
    });


    const handleContinueForm = async () => {
        setIsLoading(true);
        try {
            const { success, data } = await AuthService.postCompleteRegister({
                aniosExp: form.anios,
                descripcionCorta: form.descripcion,
                especialidades: form.especialidades.map((val) => { return { id: val } }),
                horarioFin: form.hora_f,
                horarioInicio: form.hora_i,
                pais: form.pais,
            });
            if (!success) return false;
            const user = auth.loggedInUser;
            if (user) {
                auth.updateUser({ ...user, status: data.status })
                setIsLoading(false);
                history.push('/register/step3');
            }
            
        } catch (err: any) {
            setErrorMessage(err.message ?? "Error desconocido");
            setShowModal(true);
            setIsLoading(false);
            return false;
        }
    }

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
                        anios: data.anios_exp,
                        pais: data.pais_id,
                        especialidades: data.especialidades.map((item) => item.id.toString()),
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

    const setPais = (value: string) => {
        setForm(prev => ({ ...prev, pais: value }));
    }

    const setEspecialidadesSel = (value: string) => {
        const especialidadesSel: string[] = JSON.parse(value)
        setForm(prev => ({ ...prev, especialidades: especialidadesSel }));
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
        paises,
        setPais,
        especialidades,
        setEspecialidadesSel,
    }
}