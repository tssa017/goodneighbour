import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null); // State to hold error message

    const login = async (credentials) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/users/sign_in',
                credentials
            );

            if (response.status === 200) {
                setIsLoggedIn(true);
                setError(null);
            } else {
                console.error('Login failed');
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            setError(
                'Error occurred during login. Have you created a GoodNeighbour account?'
            );
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};
