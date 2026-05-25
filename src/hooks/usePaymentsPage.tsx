import { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { useLoadingContext } from "../context/LoadingContext";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { MiCuentaData } from "../types/responses/PerfilResponse";
import { PerfilService } from "../service/PerfilService";
import { useHistory } from "react-router";
import { PaymentsService } from "../service/PaymentsService";

export function usePaymentsPage() {

    const [accountData, setAccountData] = useState<MiCuentaData | null>(null)
    const [summaryData, setSummaryData] = useState<{
        ganancias: number;
        pagos: number;
        saldo: number;
    }>({
        ganancias: 0,
        pagos: 0,
        saldo: 0,
    })

    const history = useHistory();
    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();

    useIonViewWillEnter(() => {
        loadAccount()
        loadSummary()
    }, [])


    const loadAccount = async () => {
        try {
            const { success, data } = await PerfilService.getMiCuenta()
            if (success) {
                setAccountData(data)
            }
        } catch (error: any) {
            console.log("Error al consultar chats", error)
        }

    }

    const loadSummary = async () => {
        try {
            const { success, data } = await PaymentsService.getPaymentsSummary()
            if (success) {
                setSummaryData(data)
            }
        } catch (error: any) {
            console.log("Error al consultar chats", error)
        }

    }




    const handleGoToAccount = () => {
        history.push('/modify-account')
    }

    const handleGoToHistory = () => {
        history.push('/history-payments')
    }


    return {
        accountData,
        handleGoToAccount,
        handleGoToHistory,
        summaryData
    }

}