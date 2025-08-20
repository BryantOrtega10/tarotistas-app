import { IonContent, IonFooter, IonPage, ToggleCustomEvent } from '@ionic/react';
import CustomTabBar from '../components/CustomTabBar/CustomTabBar';
import StatusContainer from '../components/StatusContainer/StatusContainer';
import { useState } from 'react';
import './HomePage.css'
import CustomButton from '../components/CustomButton/CustomButton';
import RequestItem, { RequestItemProps } from '../components/RequestItem/RequestItem';
import LastestCommentsItem, { LastestCommentsItemProps } from '../components/LastestCommentsItem/LastestCommentsItem';

const HomePage: React.FC = () => {

    const [status, setStatus] = useState<boolean>(false)
    const [requests, setRequests] = useState<RequestItemProps[]>([
        { user: { name: 'Andres', image: '' }, createdAgo: '15 Mins' },
        { user: { name: 'Pedro', image: '' }, createdAgo: '15 Mins' },
        { user: { name: 'Juan Felipe', image: '' }, createdAgo: '15 Mins' }
    ])

    const [comments, setComments] = useState<LastestCommentsItemProps[]>([
        { user: { name: 'Andres', image: '' }, message: 'Hola, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Pedro', image: '' }, message: 'Hola2, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Pedro', image: '' }, message: 'Hola2, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Pedro', image: '' }, message: 'Hola2, estoy interesado en tomar un servicio contigo' },
        { user: { name: 'Juan Felipe', image: '' }, message: 'Hola3, que buen servicio', replyMessage: "Muchas gracias por tomarlo" }
    ])

    

    const validateToggle = (event: ToggleCustomEvent<{ checked: boolean }>) => {
        setStatus(event.detail.checked);
    };


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
                        <LastestCommentsItem {...comment} key={`comment_${index}`}></LastestCommentsItem>
                    )}
                </section>


            </IonContent>
            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='home' />
            </IonFooter>
        </IonPage>
    );
};

export default HomePage;
