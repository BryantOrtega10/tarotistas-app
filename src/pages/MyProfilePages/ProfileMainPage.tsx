import { useState } from 'react';
import './MyProfileHomePage.css'
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import MyChatsItem, { MyChatsItemProps } from '../../components/MyChatsItem/MyChatsItem';
import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';

const MyProfileHomePage: React.FC = () => {


    return (
        <IonPage>
            <IonContent fullscreen className='padding-container-all'>
                <h1>Tu perfil</h1>
                
            </IonContent>
            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='profile' />
            </IonFooter>
        </IonPage>
    );
};

export default MyProfileHomePage;
