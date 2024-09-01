import * as React from 'react';
import '../styles/dashboardlayout.css';
import Header from "./Header";

interface DasboardLayoutProps {
    children: React.ReactNode;
    user: any;
}

const DashboardLayout = ({ children, user }: DasboardLayoutProps) => {
    return (
        <div className="dlayout-div">
            <Header user={user} />
            {children}
        </div>
    )
}

export default DashboardLayout;