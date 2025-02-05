// consumer-mfe/src/hooks/useAuthListener.js
import { useState, useEffect } from 'react';

export const useAuthListener = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            setIsAuthenticated(!!token && !isTokenExpired(token)); // Add token expiration logic
        };

        // Initial check
        checkAuth();

        // Listen for auth-change events
        const handleAuthChange = (event) => {
            setIsAuthenticated(event.detail.isAuthenticated);
        };

        window.addEventListener('auth-change', handleAuthChange);

        return () => {
            window.removeEventListener('auth-change', handleAuthChange);
        };
    }, []);

    return isAuthenticated;
};