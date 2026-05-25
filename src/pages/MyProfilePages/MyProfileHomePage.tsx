import { useState } from 'react';
import './MyProfileHomePage.css'
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import MyChatsItem, { MyChatsItemProps } from '../../components/MyChatsItem/MyChatsItem';
import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import CustomActionCard from '../../components/CustomActionCard/CustomActionCard';
import { useHistory } from 'react-router';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useAuth } from '../../context/AuthContext';

const MyProfileHomePage: React.FC = () => {

    const history = useHistory();
    const { logout, loggedInUser } = useAuth(); 
    
    const handleMyProfileDetails = () => {
        history.push('/my-profile/details')
    }
    const handleRatings = () => {
        history.push('/ratings')
    }
    const handlePayments = () => {
        history.push('/payments')
    }
    return (
        <IonPage>
            <IonContent fullscreen className='padding-container-all'>
                <h1>Tu perfil</h1>
                <ProfileImage showName user={loggedInUser!} />
                <section className='custom-cards'>
                    <CustomActionCard textAction='Ver más' handleClick={handlePayments}>Historial y pagos</CustomActionCard>
                    <CustomActionCard textAction='Ver más' handleClick={handleMyProfileDetails}>Detalles de mi cuenta</CustomActionCard>
                    <CustomActionCard textAction='Ver más' handleClick={handleRatings}>Calificaciones</CustomActionCard>
                </section>

            </IonContent>
            <IonFooter className='footer-buttons'>
                <CustomButton variant='purple-outline' onClick={() => logout()}>Cerrar sesión</CustomButton>
            </IonFooter>
            <IonFooter className='footer-tab-bar'>
                <CustomTabBar active='profile' />
            </IonFooter>
        </IonPage>
    );
};

export default MyProfileHomePage;
