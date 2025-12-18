import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { ChatService } from "../service/ChatService";
import { ClienteChat } from "../types/responses/ChatResponse";
import { IonInfiniteScrollCustomEvent, RefresherCustomEvent } from "@ionic/core";
import { Message, SenderTypes } from "../types/models/Chat";
import { Channel } from "pusher-js";
import { Chat } from "../models/Chat.model";
import { useIonViewWillLeave } from "@ionic/react";

export function useChatMessagePage(chat_id: number) {
    const history = useHistory();
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])
    const [loadMoreMessages, setLoadMoreMessages] = useState<boolean>(false)
    const [clienteChat, setClienteChat] = useState<ClienteChat>()
    const messagesContainerRef = useRef<HTMLIonContentElement>(null);
    const [scrollToBottom, setScrollToBottom] = useState<boolean>(false)
    const [canal, setCanal] = useState<Channel>()
    const [messageText, setMessageText] = useState<string>("")

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container && scrollToBottom) {
            container.scrollToBottom(0)
        }
    }, [scrollToBottom])

    useEffect(() => {
        if (chat_id) {
            loadMessages()
            subscribeChannel()
        }

    }, [chat_id])

    useEffect(() => {
        if (canal) {
            canal.unbind_all()
            canal.bind("mensaje.nuevo", (data: any) => {
                const newChatItem: Chat = data.chat;
                if (newChatItem.origen === 1) {
                    const newMessage: Message = {
                        id: newChatItem.id,
                        message: newChatItem.mensaje,
                        sender: SenderTypes.CLIENTE,
                        created_at: newChatItem.created_at ?? ""
                    }
                    //Verificar si el mensaje existe
                    const existsMessage = messages.filter((item) => item.id === newMessage.id)
                    if (existsMessage.length === 0) {
                        setMessages(prev => [
                            ...prev,
                            newMessage
                        ]);
                        setTimeout(() => {
                            if (messagesContainerRef.current) {
                                messagesContainerRef.current.scrollToBottom(300)
                            }
                        }, 500)
                        //TODO: Cambiar estado del chat a leido
                        console.log("Nuevo mensaje:", data);
                    }
                }


            });
        }

    }, [canal])

    const subscribeChannel = async () => {
        const channel = await ChatService.connectToChatChannel(chat_id);
        setCanal(channel)

    }
    useIonViewWillLeave(() => {
        if(canal){
            canal.unbind_all()
        }
    },[canal])

    const loadMessages = async (before_id?: number) => {
        try {
            const { success, data } = await ChatService.getChatMessages(chat_id, { before_id: before_id })
            if (success) {
                const parsedData: Message[] = data.mensajes.map((item) => {
                    return {
                        id: item.id,
                        sender: (item.origen === 1 ? SenderTypes.CLIENTE : SenderTypes.TAROTISTA),
                        message: item.mensaje,
                        created_at: item.created_at ?? null
                    }
                })
                setClienteChat(data.cliente)
                setMessages(prev => [
                    ...parsedData,
                    ...prev
                ]);
                
                const localLoadMore = (data.mensajes.length !== 0 && data.mensajes[0].id !== data.primerId);
                if (!localLoadMore) {
                    setIsInfiniteDisabled(true);
                }

                if (data.mensajes.length < 10) {
                    setIsInfiniteDisabled(true);
                }


                setLoadMoreMessages(localLoadMore)

                if (!before_id) {
                    setScrollToBottom(true)
                }
            }
        } catch (error: any) {
            console.log("Error al consultar chats", error)
        }

    }

    const handleGoChat = (chat_id: number) => {
        history.push(`/my-chats/chat/${chat_id}`)
    }

    const loadMoreData = async (event: IonInfiniteScrollCustomEvent<void>) => {

        if (!loadMoreMessages) {
            setIsInfiniteDisabled(true);
            event.target.complete();
        } else {
            if (messages.length > 0) {
                await loadMessages(messages[0].id);
            }
            event.target.complete();
        }
    };

    const handleRefresh = async (event: RefresherCustomEvent) => {
        await resetData();
        event.detail.complete();
    };

    const resetData = async () => {
        setMessages([]);
        setLoadMoreMessages(true)
        await loadMessages();
        setIsInfiniteDisabled(false);
    };

    const handleSendMessage = async () => {
        if (messageText) {
            setMessages(prev => [
                ...prev,
                {
                    id: 0,
                    sender: SenderTypes.TAROTISTA,
                    message: messageText,
                    created_at: new Date().toISOString()
                }
            ]);
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollToBottom(300)
            }
            setMessageText("")
            await ChatService.postChatMessages(chat_id, { mensaje: messageText })
        }

    }

    return {
        clienteChat,
        messages,
        handleGoChat,
        isInfiniteDisabled,
        loadMoreData,
        handleRefresh,
        messagesContainerRef,
        handleSendMessage,
        messageText, 
        setMessageText
    }

}