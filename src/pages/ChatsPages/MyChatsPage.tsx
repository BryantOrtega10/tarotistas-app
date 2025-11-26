import { useState } from 'react';
import './MyChatsPage.css'
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import MyChatsItem, { MyChatsItemProps } from '../../components/MyChatsItem/MyChatsItem';
import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import { useHistory } from 'react-router';

const MyChatsPage: React.FC = () => {

    const [myChats, setMyChats] = useState<MyChatsItemProps[]>([
        {
            client: {
                id: 1,
                user: { name: 'Andres', image: '/assets/images/test-person2.png' },
                birthDate: '10 de octubre de 1994'
            },
            idChat: 1, lastMessage: "Quería conocer todo el tema...", unReadCount: 7, lastMessageDate: "Hoy 2:45 pm", messages: []
        },
        {
            client: {
                id: 1,
                user: { name: 'Natalia', image: '/assets/images/test-person4.png' },
                birthDate: '10 de octubre de 1994'
            },
            idChat: 1, lastMessage: "Si, te queria consultar aquella...", unReadCount: 7, lastMessageDate: "Hoy 2:45 pm", messages: []
        },
        {
            client: {
                id: 1,
                user: { name: 'Camilo Parra', image: '/assets/images/test-person3.png' },
                birthDate: '10 de octubre de 1994'
            },

            idChat: 1, lastMessage: "Pero en la video llamada que...", unReadCount: 0, lastMessageDate: "Hoy 2:45 pm", messages: []
        },
        {
            client: {
                id: 1,
                user: { name: 'Parra', image: '/assets/images/test-person5.png' },
                birthDate: '10 de octubre de 1994'
            },

            idChat: 1, lastMessage: "Quería conocer todo el tema...", unReadCount: 10, lastMessageDate: "Hoy 2:45 pm", messages: []
        },
    ])

    return (
        <IonPage>
            <IonContent fullscreen className='padding-container-all'>
                <h1>Tus Chats</h1>
                <section className='my-chats-container'>
                    {myChats.map((myChat, index) =>
                        <MyChatsItem {...myChat} key={`chat_${index}`} />
                    )}
                </section>
            </IonContent>
            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='chat' />
            </IonFooter>
        </IonPage>
    );
};

export default MyChatsPage;
