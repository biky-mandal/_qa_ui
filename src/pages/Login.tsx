import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Input, message, Modal, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/login.css';
import { useScreenDetector } from '../hooks/useScreenDetector';
import { IUserLogin, IUserRegister } from '../interface/IUser';
import axios, { AxiosError } from 'axios';
import { server } from '../constants/config';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth';

interface ILogin {
}

const Login = ({ }: ILogin) => {

    const [form] = Form.useForm();
    const naviagte = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isNewUser, setIsNewUser] = useState(false);
    const { isMobile, isTablet, isDesktop } = useScreenDetector();
    const dispatch = useDispatch();

    const httpConfig = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const handleOk = async () => {
        if (await form.validateFields()) {

            if (isNewUser) {
                const newUser: IUserRegister = {
                    name: form.getFieldValue('name'),
                    email: form.getFieldValue('email'),
                    password: form.getFieldValue('password'),
                    role: 'user'
                }
                try {
                    const { data } = await axios.post(`${server}/user/register`, newUser, httpConfig);
                    dispatch(userExists(data?.user))
                    message.success(data?.message);
                } catch (error: any) {
                    message.error(error?.response?.data?.message || 'Error!');
                }
            } else {
                const newUser: IUserLogin = {
                    email: form.getFieldValue('email'),
                    password: form.getFieldValue('password'),
                }

                try {
                    const { data } = await axios.post(`${server}/user/login`, newUser, httpConfig);
                    message.success(data?.message);
                    dispatch(userExists(data?.user))
                } catch (error: any) {
                    message.error(error?.response?.data?.message || 'Error!');
                }
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        naviagte('/');
    };

    return (
        <div className="Login-div">
            <Modal closeIcon={false} width={isMobile ? '90%' : isTablet ? '60%' : isDesktop ? '25%' : '30%'} maskClosable={false} open={isModalOpen} okText={isNewUser ? 'Register' : 'Login'} onOk={handleOk} onCancel={handleCancel}>
                <div className='top-login-item'>
                    <img src={logo} alt='QA' />
                    <p className='new-user-text'>New User ? <Switch value={isNewUser} onChange={(e) => setIsNewUser(e)} /></p>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <p className='please-text'>Please {isNewUser ? 'register' : 'login'} to continue!</p>
                </div>
                <div className='login-controls'>
                    <Form
                        form={form}
                        name="register"
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        {/* For New User Name is required! */}
                        {
                            isNewUser && <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!',
                                    },
                                ]}
                            >
                                <Input placeholder="Full Name" />
                            </Form.Item>
                        }


                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 6, message: 'Password must be minimum 6 characters.'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                    </Form>
                </div>

            </Modal>
        </div>
    )
}

export default Login;