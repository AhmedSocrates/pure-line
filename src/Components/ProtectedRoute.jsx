import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('pureline_auth_token');
    const user = JSON.parse(localStorage.getItem('pureline_user') || '{}');

    const isAuthorized = token && user.role === 'admin';

    if (!isAuthorized) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}
