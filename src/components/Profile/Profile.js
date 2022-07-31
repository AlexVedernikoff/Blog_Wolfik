import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';

import FormProfile from '../Profile/FormProfile';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { fetchUserUpdate } from '../../store/userSlice';

const Profile = () => {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const dispath = useDispatch();
    const { error, userData } = useStateUser();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // если пользователь сохранен в стор
        if (userData) {
            setEmail(userData.email);
            setUsername(userData.username);
            setToken(userData.token);
        }
    }, [ userData]);

    const editProfile = (val) => {
        // сохраняет предыдущие данные пользователя
        const newUser = { ...userData };
        for (const prop in val) {
            // если новые данные не равны пустой строке или undefined
            if (val[prop] !== '' && val[prop] !== undefined) {
                // то изменяет их
                newUser[prop] = val[prop];
            }
        }
        dispath(fetchUserUpdate({ newUser, token })).then((res) => {
            try {
                localStorage.removeItem('token');
                localStorage.setItem('token', JSON.stringify(res.payload.user.token));
                setIsSuccess(true);
            } catch (err) {
                setIsSuccess(false);
                console.log('234 error ', err);
            }
        });
    };

    // при закрытии сообщения об успехе
    const atCloseSuccessMessage = () => {
        setIsSuccess(false);
    };

    // сообщение об успешной авторизации
    const successMessage = isSuccess && (
        <SuccessMessage description="Profile edit successfully!" closable={true} closingAlert={atCloseSuccessMessage} />
    );

    const profile = !successMessage && <FormProfile editProfile={editProfile} email={email} username={username} />;

    return (
        <>
            {error
                ? <Alert className='alert' message='Something has gone wrong' type="error" showIcon style={{ height: '50px' }} />
                : null}
            {successMessage}
            {profile}
        </>
    );
};

export { Profile };