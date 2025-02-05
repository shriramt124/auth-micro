// consumer-mfe/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthListener } from '../hooks/useAuthListener';

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthListener();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};