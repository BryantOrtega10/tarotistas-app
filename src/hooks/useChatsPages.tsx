import { useState } from "react";
import { useHistory } from "react-router";
import { ChatService } from "../service/ChatService";
import { ChatItemHome } from "../types/responses/ChatResponse";
import { useIonViewWillEnter } from "@ionic/react";
import { IonInfiniteScrollCustomEvent, RefresherCustomEvent } from "@ionic/core";

export function useChatsPages() {
    const history = useHistory();
    const [chatItems, setChatItems] = useState<ChatItemHome[]>([])
    const [skip, setSkip] = useState<number>(0)
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);
    const [total, setTotal] = useState<number>();

    useIonViewWillEnter(() => {
        loadChats(0)
    }, [])

    const loadChats = async (skip: number) => {
        try {
            const { success, data, total } = await ChatService.getChats({ skip: skip, take: 10 })
            if (success) {
                setTotal(total);
                setChatItems(prev => [
                    ...prev.slice(0, skip),
                    ...data,
                    ...prev.slice(skip + 10)
                ]);
                setSkip(skip + 10)
                if(total < 10){
                    setIsInfiniteDisabled(true)
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
        if (total && total <= skip) {
            setIsInfiniteDisabled(true);
            event.target.complete();
        } else {
            await loadChats(skip);
            event.target.complete();
        }
    };

    const handleRefresh = async (event: RefresherCustomEvent) => {
        await resetData();
        event.detail.complete();
    };

    const resetData = async () => {
        setSkip(0);
        setChatItems([]);
        setTotal(undefined);
        await loadChats(0);
        setIsInfiniteDisabled(false);
    };

    return {
        chatItems,
        handleGoChat,
        isInfiniteDisabled,
        loadMoreData,
        handleRefresh
    }

}