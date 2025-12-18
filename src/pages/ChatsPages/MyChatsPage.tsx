import { useState } from 'react';
import './MyChatsPage.css'
import { IonContent, IonFooter, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import MyChatsItem, { MyChatsItemProps } from '../../components/MyChatsItem/MyChatsItem';
import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import { useHistory } from 'react-router';
import { useChatsPages } from '../../hooks/useChatsPages';

const MyChatsPage: React.FC = () => {
    const {
        chatItems,
        handleGoChat,
        isInfiniteDisabled,
        loadMoreData,
        handleRefresh
    } = useChatsPages();


    return (
        <IonPage>
            <IonContent fullscreen className='padding-container-all'>
                <h1>Tus Chats</h1>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh} data-testid="refresher">
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <section className='my-chats-container'>
                    {chatItems.map((myChat, index) =>
                        <MyChatsItem {...myChat} handleGoChat={handleGoChat} key={`chat_${index}`} />
                    )}
                </section>
                <IonInfiniteScroll
                    disabled={isInfiniteDisabled}
                    onIonInfinite={loadMoreData}
                    data-testid="infinite-scroll">
                    <IonInfiniteScrollContent loadingText="Cargando mas chats..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='chat' />
            </IonFooter>
        </IonPage>
    );
};

export default MyChatsPage;
