import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/LoginPage';
import RegistrationStep1Page from './pages/RegistrationPages/RegistrationStep1Page';
import RegistrationStep2Page from './pages/RegistrationPages/RegistrationStep2Page';
import RegistrationStep3Page from './pages/RegistrationPages/RegistrationStep3Page';
import Onboarding from './pages/Onboarding';
import HomePage from './pages/HomePage';
import MyChatsPage from './pages/ChatsPages/MyChatsPage';
import MyProfileHomePage from './pages/MyProfilePages/MyProfileHomePage';
import MyAccountDetailsPage from './pages/MyProfilePages/MyAccountDetailsPage';
import EditProfilePage from './pages/MyProfilePages/EditProfilePage';
import { AuthProvider } from './context/AuthContext';
import ChatPage from './pages/ChatsPages/ChatPage';

setupIonicReact();

const App: React.FC = () => (

  <IonApp>
    <IonReactRouter>
      <AuthProvider>
        <IonRouterOutlet>
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
          <Route exact path="/my-chats/chat">
            <ChatPage />
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


          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </AuthProvider>
    </IonReactRouter>
  </IonApp>

);

export default App;
