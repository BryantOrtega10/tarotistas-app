import { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { useLoadingContext } from "../context/LoadingContext";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { MiCuentaData } from "../types/responses/PerfilResponse";
import { PerfilService } from "../service/PerfilService";
import { useHistory } from "react-router";
import { PaymentsService } from "../service/PaymentsService";
import { PaymentHistoryItem } from "../types/responses/PaymentsResponse";
import { IonInfiniteScrollCustomEvent, RefresherCustomEvent } from "@ionic/core";

export function useHistoryPaymentsPage() {

    const [historyItems, setHistoryItems] = useState<PaymentHistoryItem[]>([])
    const [skip, setSkip] = useState<number>(0)
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);
    const [total, setTotal] = useState<number>();

    const history = useHistory();
    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();

    useIonViewWillEnter(() => {
        loadHistory(0)
    }, [])

    const loadHistory = async (skip: number) => {
        try {
            const { success, data } = await PaymentsService.getPayments({ skip: skip, take: 10 })
            if (success) {
                setTotal(data.total);
                setHistoryItems(prev => [
                    ...prev.slice(0, skip),
                    ...data.historial,
                    ...prev.slice(skip + 10)
                ]);
                setSkip(skip + 10)
            }
        } catch (error: any) {
            console.log("Error al consultar chats", error)
        }

    }

    const loadMoreData = async (event: IonInfiniteScrollCustomEvent<void>) => {


        if (total && total <= skip) {
            setIsInfiniteDisabled(true);
            event.target.complete();
        } else {
            loadHistory(skip)
            event.target.complete();
        }
    };

    const handleRefresh = async (event: RefresherCustomEvent) => {
        await resetData();
        event.detail.complete();
    };

    const resetData = async () => {
        setSkip(0);
        setHistoryItems([]);
        setTotal(undefined);
        await loadHistory(0);
        setIsInfiniteDisabled(false);
    };

    return {
        historyItems,
        loadMoreData,
        isInfiniteDisabled,
        handleRefresh
    }

}