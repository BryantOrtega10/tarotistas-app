import { useEffect, useRef, useState } from 'react';
import './MyChatsPage.css'
import { IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonPage } from '@ionic/react';
import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import { Chat, SenderTypes } from '../../types/models/Chat';
import ChatMessageItem from '../../components/ChatMessageItem/ChatMessageItem';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import CustomButton from '../../components/CustomButton/CustomButton';
import { send, sendOutline } from 'ionicons/icons';

const ChatPage: React.FC = () => {

    const chat: Chat = {
        client: {
            id: 1,
            user: { name: 'Andres', image: '' },
            birthDate: '10 de octubre de 1994'
        },
        idChat: 1,
        lastMessage: "Quería conocer todo el tema...",
        unReadCount: 7,
        lastMessageDate: "Hoy 2:45 pm",
        messages: [
            { id: 1, message: "Hola, estoy interesado en tomar un servicio contigo", sender: SenderTypes.CLIENTE },
            { id: 2, message: "Buenas tardes con gusto, ¿en qué estás interesado?", sender: SenderTypes.TAROTISTA },
            { id: 3, message: "En lectura de cartas", sender: SenderTypes.CLIENTE },
            { id: 4, message: "¡Claro que sí!", sender: SenderTypes.TAROTISTA },
            { id: 3, message: "En lectura de cartas", sender: SenderTypes.CLIENTE },
            { id: 3, message: "En lectura de cartas", sender: SenderTypes.CLIENTE },
            { id: 3, message: "En lectura de cartas", sender: SenderTypes.CLIENTE },
            { id: 3, message: "En lectura de cartas", sender: SenderTypes.CLIENTE },
            { id: 3, message: "En lectura de cartas", sender: SenderTypes.CLIENTE },
            { id: 3, message: "En lectura de cartas", sender: SenderTypes.CLIENTE },
            { id: 3, message: "En lectura de cartas", sender: SenderTypes.CLIENTE },
        ]
    }

    const messagesContainerRef = useRef<HTMLIonContentElement>(null);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollToBottom(300)
        }
    }, [chat.messages]);

    return (
        <IonPage>
            <IonHeader className='header-chat ion-no-border'>

                <CustomBackButton className="back-chat">
                    <div className='user-chat'>
                        <figure>
                            <IonImg src={chat.client.user.image ? chat.client?.user.image : '/assets/images/no-person/no-person.png'} />
                        </figure>
                        <b>{chat.client.user.name.split(" ")[0]}</b>
                    </div>
                </CustomBackButton>
                <div className='birth-date-container'>
                    <span>Fecha de nacimiento</span>
                    <span className='birth-date-user'>{chat.client.birthDate}</span>
                </div>

            </IonHeader>
            <IonContent className='chat-messages-container padding-container-all' ref={messagesContainerRef}>

                {chat.messages.map((message, index) => {
                    return <ChatMessageItem {...message} key={`message_${index}`}></ChatMessageItem>
                })}

            </IonContent>
            <IonFooter class='ion-no-border chat-message-footer'>
                <div className='chat-message-textarea-container'>
                    <CustomTextArea autoGrow={true} rows={1} placeholder='Escribe un mensaje'></CustomTextArea>
                    <CustomButton onClick={() => {
                        if(messagesContainerRef.current){
                            messagesContainerRef.current.scrollToBottom(300)
                        }
                        }}>
                        <IonIcon icon={send}></IonIcon>
                    </CustomButton>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default ChatPage;
