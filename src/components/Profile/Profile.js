import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';

import FormProfile from '../Profile/FormProfile';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { fetchUserUpdate, errorNull } from '../../store/userSlice';

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
        if (userData) {
            setEmail(userData.email);
            setUsername(userData.username);
            setToken(userData.token);
        }
    }, [ userData]);

    const editProfile = (val) => {
        const newUser = { ...userData };
        for (const prop in val) {
            if (val[prop] !== '' && val[prop] !== undefined) {
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
            }
        });
    };

    const atCloseSuccessMessage = () => {
        setIsSuccess(false);
    };
    const onCloseMessage = () => {
        dispath(errorNull());
    };
    const successMessage = isSuccess && (
        <SuccessMessage description="Profile edit successfully!" closable={true} closingAlert={atCloseSuccessMessage} />
    );
    const errorAlert = error && <Alert description={error} type="error" showIcon closable onClose={() => onCloseMessage()} />;
    const profile = !successMessage && <FormProfile editProfile={editProfile} email={email} username={username} />;

    return (
        <>
            {errorAlert}
            {successMessage}
            {profile}
        </>
    );
};

export { Profile };