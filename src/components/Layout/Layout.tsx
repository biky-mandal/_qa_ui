import * as React from 'react';
import '../styles/layout.css';
import Header from "../Header";

interface LayoutProps {
    children: React.ReactNode;
    user: any;
}

const Layout = ({ children, user }: LayoutProps) => {
    return (
        <div className="layout-div">
            <Header user={user} />
            {children}
        </div>
    )
}

export default Layout;