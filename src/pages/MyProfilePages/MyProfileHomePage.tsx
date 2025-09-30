import { useState } from 'react';
import './MyProfileHomePage.css'
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import MyChatsItem, { MyChatsItemProps } from '../../components/MyChatsItem/MyChatsItem';
import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import CustomActionCard from '../../components/CustomActionCard/CustomActionCard';

const MyProfileHomePage: React.FC = () => {


    return (
        <IonPage>
            <IonContent fullscreen className='padding-container-all'>
                <h1>Tu perfil</h1>
                <ProfileImage showName user={{name: "Andres Carvajal", image: ''}} />
                <section className='custom-cards'>
                <CustomActionCard textAction='Ver más' handleClick={() => {}}>Historial y pagos</CustomActionCard>
                <CustomActionCard textAction='Ver más' handleClick={() => {}}>Detalles de mi cuenta</CustomActionCard>
                <CustomActionCard textAction='Ver más' handleClick={() => {}}>Calificaciones</CustomActionCard>
                </section>
            </IonContent>
            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='profile' />
            </IonFooter>
        </IonPage>
    );
};

export default MyProfileHomePage;
