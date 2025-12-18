import { IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonModal, IonPage, IonRefresher, IonRefresherContent } from '@ionic/react';
import CustomBackButton from '../../components/CustomBackButton/CustomBackButton';
import './MyRatingsPage.css'
import CustomTopTabItem from '../../components/CustomTopTabItem/CustomTopTabItem';
import { useState } from 'react';
import CommentItem from '../../components/CommentItem/CommentItem';
import { Comment } from '../../types/models/Comment';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import CustomButton from '../../components/CustomButton/CustomButton';
import RatingItem from '../../components/RatingItem/RatingItem';
import { Rating } from '../../types/models/Rating';
import { useRatingsPage } from '../../hooks/useRatingsPage';

const MyRatingsPage: React.FC = () => {

    

    const {
        comentarioItems,
        isInfiniteDisabled,
        loadMoreData,
        handleRefresh,
        handleOpenModal,
        handleCloseModal,
        showReplyModal,
        selectedComment,
        response,
        setShowReplyModal,
        setResponse,
        handleResponse,
        activeTab,
        setActiveTab,
        handleSelectComments,
        handleSelectRatings,
        calificacionItems
    } = useRatingsPage()

    return (
        <IonPage>
            <IonHeader class='ion-no-border padding-header'>
                <CustomBackButton>Calificaciones</CustomBackButton>
                <div className='top-bar-container'>
                    <CustomTopTabItem label='Comentarios' handleClick={handleSelectComments} isActive={activeTab == 'Comentarios'}></CustomTopTabItem>
                    <span className='top-bar-separator'></span>
                    <CustomTopTabItem label='Calificaciones' handleClick={handleSelectRatings} isActive={activeTab == 'Calificaciones'}></CustomTopTabItem>
                </div>
            </IonHeader>
            <IonContent className='padding-container-all'>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh} data-testid="refresher">
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <section className='comments-container' style={{ display: activeTab == 'Comentarios' ? 'block' : 'none' }}>
                    {comentarioItems.map((comment, index) => {
                        return <CommentItem  {...comment}
                            handleReply={() => handleOpenModal(comment)} key={`comment_${index}`}></CommentItem>
                    })}
                </section>
                <section className='ratings-container' style={{ display: activeTab == 'Calificaciones' ? 'block' : 'none' }}>
                    {calificacionItems.map((ratingItem, index) => {
                        return <RatingItem {...ratingItem} key={`ratting_${index}`}></RatingItem>
                    })}
                </section>
                <IonInfiniteScroll
                    disabled={isInfiniteDisabled}
                    onIonInfinite={loadMoreData}
                    data-testid="infinite-scroll">
                    <IonInfiniteScrollContent loadingText="Cargando..." loadingSpinner="bubbles"></IonInfiniteScrollContent>
                </IonInfiniteScroll>



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

            </IonContent>
        </IonPage>
    );
};

export default MyRatingsPage;
