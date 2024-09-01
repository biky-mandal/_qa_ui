import * as React from 'react';
import '../styles/layout.css';
import { Spin } from 'antd';

interface LoadingProps {
}

const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    color: 'white',
    fontSize: '2rem',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in-out'
} as React.CSSProperties;

const Loading = ({ }: LoadingProps) => {
    return (
        <div style={loadingStyle}>
            <Spin size="large"/>
        </div>
    )
}

export default Loading;