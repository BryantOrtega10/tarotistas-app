// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthContextType } from "../types/context/AuthContext";
import { User } from "../models/User.model";
import { removeSecureItem } from "../utils/SecureStorage";
import { useHistory } from "react-router";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider(props: React.PropsWithChildren<{}>) {
    const history = useHistory();

    const [loggedInUser, setLoggedInUser] = useState<User | null>(() => {
        const userData = localStorage.getItem("loggedInUser");
        if (userData) {
            return JSON.parse(userData) as User
        }
        return null;
    });
    const login = (userData: User) => {
        setLoggedInUser(userData);
        localStorage.setItem("loggedInUser", JSON.stringify(userData))
        localStorage.setItem("isLoggedIn", "true");
    }
    const logout = () => {
        setLoggedInUser(null);
        removeSecureItem('access_token');
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        history.replace("/login");
    }
    const updateUser = (userData: User) => {
        setLoggedInUser(userData);
        localStorage.setItem("loggedInUser", JSON.stringify(userData))
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout, updateUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};
