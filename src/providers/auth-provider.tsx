'use client'

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from '../utils/axios-instance';
import { toast } from 'react-toastify';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            Cookies.set('token', response.data.token, { expires: 7 });
            setIsAuthenticated(true);
        } catch (error: any) {
            console.error('Login error', error);
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
