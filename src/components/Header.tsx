import '../styles/header.css';
import logo from '../assets/logo.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { Avatar, Popover } from 'antd';
import { ColorList, UserList } from '../libs/Avatar';
import { useState } from 'react';
import { ProfileNav } from './ProfileNav';

interface HeaderProps {
    user: any
}

const Header = ({ user }: HeaderProps) => {

    const navigate = useNavigate();
    const [userText, setUserText] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);


    const redirectToLogin = () => {
        return navigate('/login');
    }

    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
        <div className="header-div">
            <div className="header-logo">
                <img src={logo} alt='QA' />
            </div>

            <div className="header-nav">
                {
                    user ? (<>
                        <Popover trigger="click"
                            open={open}
                            onOpenChange={handleOpenChange} placement="bottomRight" content={<ProfileNav />}>
                            <Avatar style={{ backgroundColor: color, verticalAlign: 'middle', cursor: 'pointer' }} size="large">
                                {userText}
                            </Avatar>
                        </Popover>

                    </>)
                        :
                        <Button title='Login' type='secondary' clickHandler={redirectToLogin} />

                }
            </div>
        </div>
    )
}

export default Header;