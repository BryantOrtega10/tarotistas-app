import { IonRouterOutlet } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import Onboarding from './pages/Onboarding';
import RegistrationStep1Page from './pages/RegistrationPages/RegistrationStep1Page';
import RegistrationStep2Page from './pages/RegistrationPages/RegistrationStep2Page';
import RegistrationStep3Page from './pages/RegistrationPages/RegistrationStep3Page';
import HomePage from './pages/HomePage';
import MyChatsPage from './pages/ChatsPages/MyChatsPage';
import ChatPage from './pages/ChatsPages/ChatPage';
import CallPage from './pages/CallPages/CallPage';
import MyProfileHomePage from './pages/MyProfilePages/MyProfileHomePage';
import MyAccountDetailsPage from './pages/MyProfilePages/MyAccountDetailsPage';
import EditProfilePage from './pages/MyProfilePages/EditProfilePage';
import MyRatingsPage from './pages/MyRatingsPages/MyRatingsPage';
import { User } from './models/User.model';
import { removeSecureItem } from './utils/SecureStorage';
import HelpPage from './pages/HelpPage';
import PaymentsPage from './pages/PaymentsPages/PaymentsPage';
import ModifyAccountPage from './pages/PaymentsPages/ModifyAccountPage';
import HistoryPaymentsPage from './pages/PaymentsPages/HistoryPaymentsPage';



export const AppRoutes: React.FC = () => {
    const renderRedirect = () => {
        const userData = localStorage.getItem("loggedInUser");
        console.log(userData)
        if (userData) {
            const user = JSON.parse(userData) as User
            if (user.status === 3) {
                return <Redirect to="/home" />
            }
        }
        const onBoardingDone = localStorage.getItem("onBoardingDone");
        if (onBoardingDone) {
            return <Redirect to="/login" />
        }
        return <Redirect to="/onboarding" />
    }


    return (
        <IonRouterOutlet animated={true}>
            <Route exact path="/onboarding">
                <Onboarding />
            </Route>
            <Route exact path="/login">
                <LoginPage />
            </Route>
            <Route exact path="/register/step1">
                <RegistrationStep1Page />
            </Route>
            <Route exact path="/register/step2">
                <RegistrationStep2Page />
            </Route>
            <Route exact path="/register/step3">
                <RegistrationStep3Page />
            </Route>

            <Route exact path="/home">
                <HomePage />
            </Route>
            <Route exact path="/my-chats">
                <MyChatsPage />
            </Route>
            <Route exact path="/my-chats/chat/:id">
                <ChatPage />
            </Route>
            <Route exact path="/call/:id">
                <CallPage />
            </Route>
            <Route exact path="/my-profile">
                <MyProfileHomePage />
            </Route>
            <Route exact path="/my-profile/details">
                <MyAccountDetailsPage />
            </Route>
            <Route exact path="/my-profile/edit">
                <EditProfilePage />
            </Route>
            <Route exact path="/ratings">
                <MyRatingsPage />
            </Route>
            <Route exact path="/payments">
                <PaymentsPage />
            </Route>
            <Route exact path="/history-payments">
                <HistoryPaymentsPage />
            </Route>
            <Route exact path="/modify-account">
                <ModifyAccountPage />
            </Route>

            
            
            
            <Route exact path="/help">
                <HelpPage />
            </Route>

            <Route exact path="/">
                {renderRedirect()}
            </Route>
        </IonRouterOutlet>
    );
};