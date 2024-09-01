import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IAdminProectedProps {
    children: React.ReactNode;
    user: any;
    isAdmin: boolean;
}

const AdminProtectedRoute = ({ children, user, isAdmin }: IAdminProectedProps) => {

    // When User not exist redirect to Login
    if (!user) return <Navigate to={'/login'} />

    // When User exist and not an admin redirect to dashboard
    if (user && !isAdmin) return <Navigate to={'/dashboard'} />

    // Otherwise
    return children ? children : <Outlet />
}

export default AdminProtectedRoute;