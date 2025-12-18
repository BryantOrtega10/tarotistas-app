import { IonContent, IonFooter, IonHeader, IonImg, IonModal, IonPage, IonTextarea, ToggleCustomEvent } from '@ionic/react';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import StatusContainer from '../components/StatusContainer/StatusContainer';
import { useEffect, useState } from 'react';
import './HomePage.css'
import CustomButton from '../components/CustomButton/CustomButton';
import RequestItem, { RequestItemProps } from '../components/RequestItem/RequestItem';
import LastestCommentsItem, { LastestCommentsItemProps } from '../components/LastestCommentsItem/LastestCommentsItem';
import { Comment } from '../types/models/Comment';
import CustomTextArea from '../components/CustomTextArea/CustomTextArea';
import { useHistory } from 'react-router';
import { PerfilService } from '../service/PerfilService';
import { useHomePage } from '../hooks/useHomePage';

const HomePage: React.FC = () => {

    const {
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
    } = useHomePage();

    return (
        <IonPage>
            <IonHeader className='ion-no-border padding-header'>
                <img src={`/assets/images/logoHorizontal/logoHorizontal.png`}
                    className='logo-horizontal'
                    srcSet={`
                    /assets/images/logoHorizontal/logoHorizontal.png 1x,
                    /assets/images/logoHorizontal/logoHorizontal@2x.png 2x,
                    /assets/images/logoHorizontal/logoHorizontal@3x.png 3x
                `} />
            </IonHeader>
            <IonContent fullscreen className='padding-container-all'>

                <StatusContainer isActive={status} onIonChange={validateToggle} />
                <h1>Ultimas solicitudes</h1>
                <section className='requests-container'>
                    {chatItems.length === 0 && <div className='no-chats'>
                        <h3>Aun no tienes chats</h3>
                        <p>Aún no tienes chats. Realiza más servicios para obtener algunos! </p>
                    </div>}
                    {chatItems.map((chatItem, index) =>
                        <RequestItem chat_id={chatItem.idChat} createdAgo={chatItem.fecha} handleGoChat={handleGoChat} user={chatItem.cliente.user} key={`request_${index}`}></RequestItem>
                    )}
                    <CustomButton variant='transparent' onClick={handleGoChats}>Ver más solicitudes</CustomButton>
                </section>
                <h3>Ultimos comentarios</h3>
                <section className='comments-container'>
                    {comentarioItems.length === 0 && <div className='no-comments'>
                        <h3>Aun no tienes comentarios</h3>
                        <p>Aún no tienes comentarios. ¡Sigue realizando servicios para empezar a obtenerlos! </p>
                    </div>}
                    {comentarioItems.map((comentario, index) =>
                        <LastestCommentsItem
                            {...comentario}
                            handleReply={() => handleOpenModal(comentario)}
                            key={`comment_${index}`}></LastestCommentsItem>
                    )}
                </section>
                <IonModal className='reply-modal' role='dialog' initialBreakpoint={1} breakpoints={[0, 1]} isOpen={showReplyModal} onWillDismiss={() => setShowReplyModal(false)}>
                    <div className='reply-container'>
                        <div className='selected-comment'>
                            <figure>
                                <IonImg src={selectedComment?.cliente.photo ? `${import.meta.env.VITE_API_BASE_URL}storage/users/${selectedComment?.cliente.photo}` : '/assets/images/no-person/no-person.png'} />
                            </figure>
                            <div className={`selected-comment-itemDesc`}>
                                <div className={`selected-comment-username`}>{selectedComment?.cliente.name}</div>
                                <div className={`selected-comment-message`}>
                                    {selectedComment?.comentario}
                                </div>
                            </div>
                        </div>
                        <CustomTextArea placeholder='Escribir respuesta' onIonInput={(e: any) => setResponse(e.target.value)} value={response}></CustomTextArea>
                        <CustomButton variant='purple-outline' onClick={() => handleResponse(selectedComment?.comentario_id ?? 0)}>Responder</CustomButton>
                    </div>
                </IonModal>
                <br />
            </IonContent>
            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='home' />
            </IonFooter>
        </IonPage>
    );
};

export default HomePage;
