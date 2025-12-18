import { useEffect, useRef, useState } from 'react';
import './MyChatsPage.css'
import { IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonPage } from '@ionic/react';
import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import { Chat, SenderTypes } from '../../types/models/Chat';
import ChatMessageItem from '../../components/ChatMessageItem/ChatMessageItem';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import CustomButton from '../../components/CustomButton/CustomButton';
import { send, sendOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { useChatMessagePage } from '../../hooks/useChatMessagePage';

const ChatPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const {
        clienteChat,
        messages,
        isInfiniteDisabled,
        loadMoreData,
        handleRefresh,
        messagesContainerRef,
        handleSendMessage,
        messageText, 
        setMessageText
    } = useChatMessagePage(parseInt(id));

    
    // useEffect(() => {
    //     const container = messagesContainerRef.current;
    //     if (container) {
    //         container.scrollToBottom(300)
    //     }
    // }, [messages]);

    return (
        <IonPage>
            <IonHeader className='header-chat ion-no-border padding-header'>
                <CustomBackButton className="back-chat">
                    <div className='user-chat'>
                        <figure>
                            <IonImg src={clienteChat?.user.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${clienteChat.user.photo}` : '/assets/images/no-person/no-person.png'} />
                        </figure>
                        <b>{clienteChat?.nombre.split(" ")[0] ?? ""}</b>
                    </div>
                </CustomBackButton>
                <div className='birth-date-container'>
                    <span>Fecha de nacimiento</span>
                    <span className='birth-date-user'>{clienteChat?.fecha_nacimiento}</span>
                </div>

            </IonHeader>
            <IonContent className='chat-messages-container padding-container-all' ref={messagesContainerRef}>
                <IonInfiniteScroll
                    className="infinite-overlay"
                    disabled={isInfiniteDisabled}
                    position='top'
                    onIonInfinite={loadMoreData}
                    data-testid="infinite-scroll">
                    <IonInfiniteScrollContent loadingText="Cargando mas chats..." loadingSpinner="lines-small"></IonInfiniteScrollContent>
                </IonInfiniteScroll>
                {messages.map((message, index) => {
                    return <ChatMessageItem {...message} key={`message_${index}`}></ChatMessageItem>
                })}
            </IonContent>
            <IonFooter class='ion-no-border chat-message-footer'>
                <div className='chat-message-textarea-container'>
                    <CustomTextArea autoGrow={true} rows={1} placeholder='Escribe un mensaje' onIonInput={(e: any) => setMessageText(e.target.value)} value={messageText}></CustomTextArea>
                    <CustomButton onClick={handleSendMessage}>
                        <IonIcon icon={send}></IonIcon>
                    </CustomButton>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default ChatPage;
