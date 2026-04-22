import { createContext, useContext, useState } from "react";
import type { AuthContextType } from "../types";
import { getTokenFromStorage, removeTokenFromStorage, setTokenInStorage } from "../services/storageService";

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(getTokenFromStorage());
    const isAuthenticated = !!token;

    const login = (token: string) => {
        setTokenInStorage(token);
        setToken(token);
    }

    const logout = () => {
        removeTokenFromStorage();
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}