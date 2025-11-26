import { IonContent, IonFooter, IonHeader, IonImg, IonModal, IonPage, IonTextarea, ToggleCustomEvent } from '@ionic/react';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import StatusContainer from '../components/StatusContainer/StatusContainer';
import { useState } from 'react';
import './HomePage.css'
import CustomButton from '../components/CustomButton/CustomButton';
import RequestItem, { RequestItemProps } from '../components/RequestItem/RequestItem';
import LastestCommentsItem, { LastestCommentsItemProps } from '../components/LastestCommentsItem/LastestCommentsItem';
import { Comment } from '../types/models/Comment';
import CustomTextArea from '../components/CustomTextArea/CustomTextArea';
import { useHistory } from 'react-router';

const HomePage: React.FC = () => {

    const history = useHistory();

    const [status, setStatus] = useState<boolean>(false)
    const [showReplyModal, setShowReplyModal] = useState<boolean>(false)

    const [requests, setRequests] = useState<RequestItemProps[]>([
        { user: { name: 'Andres', image: '/assets/images/test-person2.png' }, createdAgo: '15 Mins' },
        { user: { name: 'Pedro', image: '/assets/images/test-person3.png' }, createdAgo: '15 Mins' },
        { user: { name: 'Juan Felipe', image: '/assets/images/test-person5.png' }, createdAgo: '15 Mins' }
    ])

    const [comments, setComments] = useState<Comment[]>([
        { user: { name: 'Andres', image: '/assets/images/test-person2.png' }, message: 'Hola, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Pedro', image: '/assets/images/test-person3.png' }, message: 'Hola2, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Maria', image: '/assets/images/test-person4.png' }, message: 'Hola2, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Pedro', image: '/assets/images/test-person5.png' }, message: 'Hola2, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Juan Felipe', image: '' }, message: 'Hola3, que buen servicio', replyMessage: "Muchas gracias por tomarlo" }
    ])

    const [selectedComment, setSelectedComment] = useState<Comment | null>(
        { user: { name: 'Juan Felipe', image: '/assets/images/test-person2.png' }, message: 'Hola3, que buen servicio', replyMessage: "Muchas gracias por tomarlo" }
    );

    const validateToggle = (event: ToggleCustomEvent<{ checked: boolean }>) => {
        setStatus(event.detail.checked);
    };

    const handleOpenModal = (comment: Comment) => {
        setSelectedComment(comment)
        setShowReplyModal(true)
    }

    const handleCloseModal = () => {
        setShowReplyModal(false)
    }

    const handleGoChats = () => {
        history.push('/my-chats')
    }

    const handleGoCall = () => {
        history.push('/call')
    }

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
                    {requests.map((request, index) =>
                        <RequestItem {...request} key={`request_${index}`}></RequestItem>
                    )}
                    <CustomButton variant='transparent' onClick={handleGoChats}>Ver más solicitudes</CustomButton>
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
                        <CustomButton variant='purple-outline' onClick={handleCloseModal}>Responder</CustomButton>
                    </div>
                </IonModal>
                <CustomButton onClick={handleGoCall}>Probar llamada</CustomButton>
                <br />
            </IonContent>
            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='home' />
            </IonFooter>
        </IonPage>
    );
};

export default HomePage;
