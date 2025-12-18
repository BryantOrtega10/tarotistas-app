import { GoogleLoginResponseOnline, SocialLogin } from '@capgo/capacitor-social-login';
import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthContextType } from '../types/context/AuthContext';
import { AuthService } from '../service/AuthService';



const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

export default function GoogleAuthProvider(props: React.PropsWithChildren<{}>) {


    const login = async () => {
        await SocialLogin.initialize({
            google: {
                webClientId: import.meta.env.VITE_WEB_GOOGLE_ID,
                iOSClientId: import.meta.env.VITE_IOS_GOOGLE_ID,
                iOSServerClientId: import.meta.env.VITE_WEB_GOOGLE_ID,
                mode: 'online'
            }
        });
        const res = await SocialLogin.login({
            provider: 'google',
            options: {
                scopes: ['email', 'profile']
            }
        });
        const result :GoogleLoginResponseOnline = res.result
        return {
            token: result.profile.id ?? "",
            name: result.profile.name ?? "",
            email: result.profile.email ?? ""
        }
    }

    return (
        <GoogleAuthContext.Provider value={{ login }}>
            {props.children}
        </GoogleAuthContext.Provider>
    );
};

export const useGoogleAuth = () => {
    const context = useContext(GoogleAuthContext);
    if (!context) throw new Error("useGoogleAuth debe usarse dentro de un GoogleAuthContext");
    return context;
};
