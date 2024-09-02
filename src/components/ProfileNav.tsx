import * as React from 'react';
import '../styles/profilenav.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { server } from '../constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../redux/reducers/auth';
import { message, Tag } from 'antd';
import coin from '../assets/coin-48.png';

export interface IProfileNav {
}

function ProfileNav({ }: IProfileNav) {
    const dispatch = useDispatch();
    const { user, isAdmin } = useSelector((state: any) => state.auth);

    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(`${server}/user/logout`, { withCredentials: true });
            message.success(data?.message);
            dispatch(userNotExists());
        } catch (error: any) {
            message.error(error?.response?.data?.message || 'Error!');
        }
    }
    return (
        <div className='profile-nav-main'>
            <div className='p-nav-head'>
                <div className='head-left'>
                    <span className='name'>
                        {user.name}
                        <Tag color={user.role === 'admin' ? 'cyan' : user.role === 'author' ? 'purple' : 'green'}>{user.role}</Tag>
                    </span>
                    <span className='email'>{user.email}</span>
                </div>
                <div className='head-right'>
                    <button className='profile-setting'>
                        <span className="material-symbols-outlined">
                            settings
                        </span>
                    </button>
                </div>
            </div>

            <div className='p-nav-mid'>
                <NavLink className="nav-links" to={isAdmin ? '/admin/dashboard' : '/dashboard'}>
                    <div className='nav-icon'>
                        <span className="material-symbols-outlined">
                            dashboard
                        </span>
                    </div>
                    <div className='nav-text'>
                        {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    </div>
                </NavLink>
                {
                    !isAdmin && <>
                        <NavLink className="nav-links" to='/practice'>
                            <div className='nav-icon'>
                                <span className="material-symbols-outlined">
                                    restart_alt
                                </span>
                            </div>

                            <div className='nav-text'>
                                Start Practice
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </NavLink>
                        <NavLink className="nav-links" to='/live'>
                            <div className='nav-icon'>
                                <span className="material-symbols-outlined">
                                    stream
                                </span>
                            </div>

                            <div className='nav-text'>
                                Start Live Session
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </NavLink>
                    </>
                }

            </div>

            <div className='p-nav-foot'>
                <span className='user-coin'><img src={coin} alt='user coin' /> {user.coins} </span>

                <button className='logout-btn' onClick={logoutHandler}>
                    Log Out
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                </button>
            </div>
        </div>
    );
}

export { ProfileNav }