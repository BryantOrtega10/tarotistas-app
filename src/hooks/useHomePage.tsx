import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { PerfilService } from "../service/PerfilService";
import { ChatService } from "../service/ChatService";
import { ChatItemHome } from "../types/responses/ChatResponse";
import { ComentarioItemHome } from "../types/responses/ComentarioResponse";
import { ComentarioService } from "../service/ComentarioService";
import { useErrorHandlerContext } from "../context/ErrorHandlerContext";
import { useLoadingContext } from "../context/LoadingContext";
import { ToggleCustomEvent, useIonViewWillEnter } from "@ionic/react";


export function useHomePage() {
    const history = useHistory();
    const { setErrorMessage, setShowModal } = useErrorHandlerContext();
    const { setIsLoading } = useLoadingContext();

    const [status, setStatus] = useState<boolean>(false)
    const [chatItems, setChatItems] = useState<ChatItemHome[]>([])
    const [comentarioItems, setComentarioItems] = useState<ComentarioItemHome[]>([])
    const [response, setResponse] = useState<string>("")

    const [showReplyModal, setShowReplyModal] = useState<boolean>(false)
    const [selectedComment, setSelectedComment] = useState<ComentarioItemHome | null>();

    const handleOpenModal = (comentario: ComentarioItemHome) => {
        setSelectedComment(comentario)
        setShowReplyModal(true)
    }

    const handleCloseModal = () => {
        setShowReplyModal(false)
        setResponse("")
    }
    
    useIonViewWillEnter(() => {
        const loadData = async () => {
            try {
                const { success, data } = await PerfilService.getEstadoConexion()
                if (success) {
                    setStatus(data.conexion_status === 3);
                }
            } catch (error: any) {
                console.log("Error al consultar estado conexión", error)
            }

            try {
                const { success, data } = await ChatService.getChats({ skip: 0, take: 3 })
                if (success) {
                    setChatItems(data)
                }
            } catch (error: any) {
                console.log("Error al consultar chats", error)
            }

            try {
                const { success, data } = await ComentarioService.getComentarios({ skip: 0, take: 5 })
                if (success) {
                    setComentarioItems(data)
                }
            } catch (error: any) {
                console.log("Error al consultar comentarios", error)
            }
        }
        loadData()
    }, [])

    const handleGoChat = (chat_id: number) => {
        history.push(`/my-chats/chat/${chat_id}`)
    }

    const handleGoChats = () => {
        history.push(`/my-chats`)
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
                if(element.comentario_id == comment_id){
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

    const validateToggle = async (event: ToggleCustomEvent<{ checked: boolean }>) => {
        
        setIsLoading(true);
        try {
            const newStatus = event.detail.checked;
            const { success, data } = await PerfilService.postEstadoConexion(newStatus)
            setIsLoading(false);
            if (!success) return false; 
            setStatus(data.conexion_status === 3);
            

        } catch (error: any) {
            setIsLoading(false);
            console.log("Error al cambiar estado conexión", error)
        }

    };

    return {
        status,
        chatItems,
        comentarioItems,
        response,
        setResponse,
        handleGoChat,
        handleGoChats,
        handleResponse,
        validateToggle,
        handleOpenModal,
        handleCloseModal,
        showReplyModal,
        setShowReplyModal,
        selectedComment,
    }

}