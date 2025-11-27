import { useEffect, useState } from "react";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { useLoadingContext } from "../context/LoadingContext";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import { RegistrationForm3 } from "../interfaces/RegistrationForms";
import { ListasService } from "../service/ListasService";
import { PerfilService } from "../service/PerfilService";
import { Banco } from "../models/Banco.model";
import { AuthService } from "../service/AuthService";


export function useRegistrationFormStep3() {
    const history = useHistory();
    const [bancos, setBancos] = useState<{ value: number, text: string }[]>([]);
    const [bancosDb, setBancosDb] = useState<Banco[]>([]);
    const [tiposCuenta, setTiposCuenta] = useState<{ value: number, text: string }[]>([
        { value: 1, text: "Ahorros" },
        { value: 2, text: "Corriente" }
    ]);
    const [showTipoCuenta, setShowTipoCuenta] = useState<boolean>(true);
    const [showOkModal, setShowOkModal] = useState<boolean>(false);

    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();
    const { logout } = useAuth();

    const [form, setForm] = useState<RegistrationForm3>({
        banco: 0,
        cuenta: "",
        tipoCuenta: 0
    });


    useEffect(() => {
        const populateArrays = async () => {
            
            try {
                const { success, data } = await ListasService.getBancos()
                if (success) {
                    const parseData = data.bancos.map((item) => { return { value: item.id, text: item.nombre } })
                    setBancosDb(data.bancos)
                    setBancos(parseData)
                }
            } catch (error: any) {
                console.log("Error al consultar paises", error)
            }

            try {
                const { success, data } = await PerfilService.getMiCuenta()
                if (success) {
                    setForm({
                        banco: data.banco_id ?? 0,
                        cuenta: data.cuenta ?? "",
                        tipoCuenta: data.tipo_cuenta ?? 0
                    });
                }
            } catch (error: any) {
                console.log("Error al consultar mi cuenta", error)
            }
        }
        populateArrays()
    }, [])

    const validateForm = () => {

        if (!form.banco) return { valid: false, message: "El banco es requerido" };
        if (!form.cuenta) return { valid: false, message: "La cuenta es requerida" };

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
            const { success } = await AuthService.postCompleteAccount({
                banco: form.banco,
                cuenta: form.cuenta,
                tipoCuenta: form.tipoCuenta
            });
            if (!success) { setIsLoading(false); return false; }
            setIsLoading(false);
            setShowOkModal(true)

        } catch (err: any) {
            setIsLoading(false);
            return false;
        }
    }

    const handleSkipForm = async () => {
        setIsLoading(true);
        try {
            const { success } = await AuthService.postCompleteRegister({
                terminarRegistro: "1"
            });
            if (!success) { setIsLoading(false); return false; }
            setIsLoading(false);
            setShowOkModal(true)

        } catch (err: any) {
            setIsLoading(false);
            return false;
        }
    }

    const handleDismissOkModal = () => {
        logout()
        history.replace('/login');
    }

    const setBanco = (value: string) => {
        //Buscar el banco y ver si le aplica el tipo de cuenta        
        const bancoFilter = bancosDb.filter((itemBanco) => itemBanco.id === parseInt(value))
        if (bancoFilter.length > 0) {
            const bancoItem = bancoFilter[0];
            if (bancoItem.ap_tipo_cuenta) {
                setShowTipoCuenta(true)
            }
            else {
                setShowTipoCuenta(false)
            }
        }

        setForm(prev => ({ ...prev, banco: parseInt(value) }));
    }

    const setTipoCuenta = (value: string) => {
        setForm(prev => ({ ...prev, tipoCuenta: parseInt(value) }));
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
        setBanco,
        setTipoCuenta,
        bancos,
        tiposCuenta,
        showTipoCuenta,
        showOkModal,
        setShowOkModal,
        handleDismissOkModal,
        handleSkipForm
    }
}