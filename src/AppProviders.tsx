import React from 'react';
import { LoadingProvider } from './context/LoadingContext';
import AuthProvider from './context/AuthContext';
import ErrorHandlerProvider from './context/ErrorHandlerContext';


export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (

        <LoadingProvider>
            <AuthProvider>
                <ErrorHandlerProvider>
                    {children}
                </ErrorHandlerProvider>
            </AuthProvider>
        </LoadingProvider>

    );
};