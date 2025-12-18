import React from 'react';
import { LoadingProvider } from './context/LoadingContext';
import AuthProvider from './context/AuthContext';
import ErrorHandlerProvider from './context/ErrorHandlerContext';
import { NotificationProvider } from './context/NotificationContext';
import GoogleAuthProvider from './context/GoogleAuthContext';


export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (

        <LoadingProvider>
            <AuthProvider>
                <NotificationProvider>
                    <GoogleAuthProvider>
                        <ErrorHandlerProvider>
                            {children}
                        </ErrorHandlerProvider>
                    </GoogleAuthProvider>
                </NotificationProvider>
            </AuthProvider>
        </LoadingProvider>

    );
};