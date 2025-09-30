// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthContextType } from "../types/context/AuthContext";
import { User } from "../types/models/User";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
    }
    const updateUser = (userData: User) => {
        setLoggedInUser(userData);
        localStorage.setItem("loggedInUser", JSON.stringify(userData))
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};
