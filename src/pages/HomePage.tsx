import { IonContent, IonFooter, IonImg, IonModal, IonPage, IonTextarea, ToggleCustomEvent } from '@ionic/react';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import StatusContainer from '../components/StatusContainer/StatusContainer';
import { useState } from 'react';
import './HomePage.css'
import CustomButton from '../components/CustomButton/CustomButton';
import RequestItem, { RequestItemProps } from '../components/RequestItem/RequestItem';
import LastestCommentsItem, { LastestCommentsItemProps } from '../components/LastestCommentsItem/LastestCommentsItem';
import { Comment } from '../types/models/Comment';
import CustomTextArea from '../components/CustomTextArea/CustomTextArea';

const HomePage: React.FC = () => {

    const [status, setStatus] = useState<boolean>(false)
    const [showReplyModal, setShowReplyModal] = useState<boolean>(false)

    const [requests, setRequests] = useState<RequestItemProps[]>([
        { user: { name: 'Andres', image: '' }, createdAgo: '15 Mins' },
        { user: { name: 'Pedro', image: '' }, createdAgo: '15 Mins' },
        { user: { name: 'Juan Felipe', image: '' }, createdAgo: '15 Mins' }
    ])

    const [comments, setComments] = useState<Comment[]>([
        { user: { name: 'Andres', image: '' }, message: 'Hola, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Pedro', image: '' }, message: 'Hola2, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Pedro', image: '' }, message: 'Hola2, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Pedro', image: '' }, message: 'Hola2, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Juan Felipe', image: '' }, message: 'Hola3, que buen servicio', replyMessage: "Muchas gracias por tomarlo" }
    ])

    const [selectedComment, setSelectedComment] = useState<Comment | null>(
        { user: { name: 'Juan Felipe', image: '' }, message: 'Hola3, que buen servicio', replyMessage: "Muchas gracias por tomarlo" }
    );

    const validateToggle = (event: ToggleCustomEvent<{ checked: boolean }>) => {
        setStatus(event.detail.checked);
    };

    const handleOpenModal = (comment: Comment) => {
        setSelectedComment(comment)
        setShowReplyModal(true)
    }

    return (
        <IonPage>
            <IonContent fullscreen className='padding-container-all'>
                <img src={`/assets/images/logoHorizontal/logoHorizontal.png`}
                    className='logo-horizontal'
                    srcSet={`
                    /assets/images/logoHorizontal/logoHorizontal.png 1x,
                    /assets/images/logoHorizontal/logoHorizontal@2x.png 2x,
                    /assets/images/logoHorizontal/logoHorizontal@3x.png 3x
                `} />
                <StatusContainer isActive={status} onIonChange={validateToggle} />
                <h1>Ultimas solicitudes</h1>
                <section className='requests-container'>
                    {requests.map((request, index) =>
                        <RequestItem {...request} key={`request_${index}`}></RequestItem>
                    )}
                    <CustomButton variant='transparent'>Ver más solicitudes</CustomButton>
                </section>
                <h3>Ultimos comentarios</h3>
                <section className='comments-container'>
                    {comments.map((comment, index) =>
                        <LastestCommentsItem {...comment} handleReply={() => handleOpenModal(comment)} key={`comment_${index}`}></LastestCommentsItem>
                    )}
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
                        <CustomButton variant='purple-outline'>Responder</CustomButton>
                    </div>
                </IonModal>

            </IonContent>
            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='home' />
            </IonFooter>
        </IonPage>
    );
};

export default HomePage;
