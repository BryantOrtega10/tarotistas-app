import { useEffect, useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";
import { IonInfiniteScrollCustomEvent, RefresherCustomEvent } from "@ionic/core";
import { ComentarioService } from "../service/ComentarioService";
import { ComentarioItemHome } from "../types/responses/ComentarioResponse";
import { useLoadingContext } from "../context/LoadingContext";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { CalificacionService } from "../service/CalificacionService";
import { CalificacionItem } from "../types/responses/CalificacionesResponse";

export function useRatingsPage() {

    const [activeTab, setActiveTab] = useState<string>('Comentarios')
    const [comentarioItems, setComentarioItems] = useState<ComentarioItemHome[]>([])
    const [calificacionItems, setCalificacionItems] = useState<CalificacionItem[]>([])

    const [skip, setSkip] = useState<number>(0)
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);
    const [total, setTotal] = useState<number>();
    const [showReplyModal, setShowReplyModal] = useState<boolean>(false)
    const [selectedComment, setSelectedComment] = useState<ComentarioItemHome | null>();
    const [response, setResponse] = useState<string>("")

    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();

    useIonViewWillEnter(() => {
        loadComments(0)
    }, [])


    const loadRatings = async (skip: number) => {
        try {
            const { success, data, total } = await CalificacionService.getCalificaciones({ skip: skip, take: 10 })
            if (success) {
                setTotal(total);
                setCalificacionItems(prev => [
                    ...prev.slice(0, skip),
                    ...data,
                    ...prev.slice(skip + 10)
                ]);
                setSkip(skip + 10)
            }
        } catch (error: any) {
            console.log("Error al consultar chats", error)
        }

    }


    const loadComments = async (skip: number) => {
        try {
            const { success, data, total } = await ComentarioService.getComentarios({ skip: skip, take: 10 })
            if (success) {
                setTotal(total);
                setComentarioItems(prev => [
                    ...prev.slice(0, skip),
                    ...data,
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
            if(activeTab === 'Comentarios'){
                await loadComments(skip);
            }
            if(activeTab === 'Calificaciones'){
                await loadRatings(skip);
            }
            event.target.complete();
        }
    };

    const handleRefresh = async (event: RefresherCustomEvent) => {
        await resetData();
        event.detail.complete();
    };

    const resetData = async () => {
        setSkip(0);
        setComentarioItems([]);
        setCalificacionItems([]);
        setTotal(undefined);
        await loadComments(0);
        await loadRatings(0);
        setIsInfiniteDisabled(false);
    };

    const handleOpenModal = (comentario: ComentarioItemHome) => {
        setSelectedComment(comentario)
        setResponse(comentario.respuesta_com ?? "")
        setShowReplyModal(true)
    }

    const handleCloseModal = () => {
        setShowReplyModal(false)
        setResponse("")
    }

    const handleResponse = async (comment_id: number) => {
        if (!response) {
            setErrorMessage("La respuesta es obligatoria");
            setShowModal(true);
            return false;

        }
        setIsLoading(true);


        try {
            const { success } = await ComentarioService.postResponderComentario(comment_id, {
                respuesta: response
            });
            setIsLoading(false);
            if (!success) return false;

            let newComentariosItems = [...comentarioItems]
            newComentariosItems.forEach(element => {
                if (element.comentario_id == comment_id) {
                    element.respuesta_com = response;
                }
            });

            setComentarioItems(newComentariosItems)
            handleCloseModal()

        } catch (error: any) {
            console.log("Error al consultar comentarios", error)
            setIsLoading(false);
        }
    }

    const handleSelectComments = async () => {
        if(activeTab !== 'Comentarios'){
            setSkip(0);
            setComentarioItems([]);
            setTotal(undefined);
            await loadComments(0);
            setIsInfiniteDisabled(false);
            setActiveTab('Comentarios')
        }
    }

    const handleSelectRatings = async () => {
        if(activeTab !== 'Calificaciones'){
            setSkip(0);
            setCalificacionItems([]);
            setTotal(undefined);
            await loadRatings(0);
            setIsInfiniteDisabled(false);
            setActiveTab('Calificaciones')
        }
    }


    return {
        comentarioItems,
        isInfiniteDisabled,
        loadMoreData,
        handleRefresh,
        handleOpenModal,
        handleCloseModal,
        showReplyModal,
        setShowReplyModal,
        selectedComment,
        response,
        setResponse,
        handleResponse,
        activeTab,
        setActiveTab,
        calificacionItems,
        handleSelectComments,
        handleSelectRatings
    }

}