import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IPProps {
    children: React.ReactNode;
    user: any;
    isAdmin: boolean;
    redirect?: string;
}

const ProtectedRoute = ({ children, user, isAdmin, redirect = '/login' }: IPProps) => {

    // When User not exist redirect to Login
    if (!user) return <Navigate to={redirect} />

    // When User exist and an admin redirect to dashboard
    if (user && isAdmin) return <Navigate to={'/admin/dashboard'} />

    return children ? children : <Outlet />
}

export default ProtectedRoute;