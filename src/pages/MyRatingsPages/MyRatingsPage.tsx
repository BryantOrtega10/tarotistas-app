import { IonContent, IonHeader, IonIcon, IonImg, IonModal, IonPage } from '@ionic/react';
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

const MyRatingsPage: React.FC = () => {

    const [activeTab, setActiveTab] = useState<string>('Comentarios')
    const [showReplyModal, setShowReplyModal] = useState<boolean>(false)
    const [selectedComment, setSelectedComment] = useState<Comment | null>(
        { user: { name: 'Juan Felipe', image: '/assets/images/test-person2.png' }, message: 'Hola3, que buen servicio', replyMessage: "Muchas gracias por tomarlo" }
    );

    const ratings: Rating[] = [
        {
            rating: 4.5, 
            ratingDate: '23/03/2025',
            user: {
                name: 'Maria Carvajal',
                image: '/assets/images/test-person4.png'
            },
        },
        {
            rating: 3.4, 
            ratingDate: '23/03/2025',
            user: {
                name: 'Andres Casas',
                image: '/assets/images/test-person5.png'
            },
        },
        {
            rating: 4.9, 
            ratingDate: '23/03/2025',
            user: {
                name: 'Camilo Cardenas',
                image: '/assets/images/test-person3.png'
            },
        },
        {
            rating: 4.8, 
            ratingDate: '23/03/2025',
            user: {
                name: 'Carlos Arenas',
                image: '/assets/images/test-person2.png'
            },
        },
    ]

    const comments: Comment[] = [
        {
            user: {
                name: 'Maria Carvajal',
                image: '/assets/images/test-person4.png'
            },
            messageDate: '23/03/2025',
            message: 'Puntual, atento y preciso con sus lecturas en todos los momentos.'
        },
        {
            user: {
                name: 'Camilo Cardenas',
                image: '/assets/images/test-person3.png'
            },
            messageDate: '23/03/2025',
            message: 'Puntual, atento y preciso con sus lecturas en todos los momentos.'
        },
        {
            user: {
                name: 'Andres Casas',
                image: '/assets/images/test-person5.png'
            },
            messageDate: '23/03/2025',
            message: 'Puntual, atento y preciso con sus lecturas en todos los momentos.'
        },
        {
            user: {
                name: 'Carlos Arenas',
                image: '/assets/images/test-person2.png'
            },
            messageDate: '23/03/2025',
            message: 'Puntual, atento y preciso con sus lecturas en todos los momentos.'
        },
    ]

    const handleOpenModal = (comment: Comment) => {
        setSelectedComment(comment)
        setShowReplyModal(true)
    }

    const handleCloseModal = () => {
        setShowReplyModal(false)
    }


    return (
        <IonPage>
            <IonHeader class='ion-no-border padding-header'>
                <CustomBackButton>Calificaciones</CustomBackButton>
                <div className='top-bar-container'>
                    <CustomTopTabItem label='Comentarios' handleClick={() => setActiveTab('Comentarios')} isActive={activeTab == 'Comentarios'}></CustomTopTabItem>
                    <span className='top-bar-separator'></span>
                    <CustomTopTabItem label='Calificaciones' handleClick={() => setActiveTab('Calificaciones')} isActive={activeTab == 'Calificaciones'}></CustomTopTabItem>
                </div>
            </IonHeader>
            <IonContent fullscreen className='padding-container-all'>

                <section className='comments-container' style={{display: activeTab == 'Comentarios' ? 'block' : 'none'}}>
                    {comments.map((comment, index) => {
                        return <CommentItem {...comment} handleClick={() => handleOpenModal(comment)} key={`comment_${index}`}></CommentItem>
                    })}
                </section>
                <section className='ratings-container' style={{display: activeTab == 'Calificaciones' ? 'block' : 'none'}}>
                    {ratings.map((rating, index) => {
                        return <RatingItem {...rating} key={`comment_${index}`}></RatingItem>
                    })}
                </section>



                <IonModal className='reply-modal' role='dialog' initialBreakpoint={1} breakpoints={[0, 1]} isOpen={showReplyModal} onWillDismiss={() => setShowReplyModal(false)}>
                    <div className='reply-container'>
                        <div className='selected-comment'>
                            <figure>
                                <IonImg src={selectedComment?.user.image ? selectedComment?.user.image : '/assets/images/no-person/no-person.png'} />
                            </figure>
                            <div className={`selected-comment-itemDesc`}>
                                <div className={`selected-comment-username`}>{selectedComment?.user.name}</div>
                                <div className={`selected-comment-message`}>
                                    {selectedComment?.message}
                                </div>
                            </div>
                        </div>
                        <CustomTextArea placeholder='Escribir respuesta'></CustomTextArea>
                        <CustomButton variant='purple-outline' onClick={handleCloseModal}>Responder</CustomButton>
                    </div>
                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default MyRatingsPage;
