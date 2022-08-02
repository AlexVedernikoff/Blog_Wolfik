
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';

import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { fetchUserRegistration, errorNull } from '../../store/userSlice';

import FormSignUp from './FormSignUp';

function SignUp() {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const dispath = useDispatch();
    const { error,  userData} = useStateUser();

    useEffect(() => {
        // если есть днные о юзере, то сохраняет токен в хранилище
        if (userData && userData !== null) {
            localStorage.setItem('token', JSON.stringify(userData.token));
        }
    }, [userData]);
    
    const userRegistration = (val) => {
        const newUser = {
            username: val.username.trim(),
            email: val.email.trim(),
            password: val.password.trim(),
        };
        dispath(fetchUserRegistration(newUser));     
    };

    const onCloseMessage = () => {
        dispath(errorNull());
    };

    const errorAlert = error && <Alert description={error} type="error" showIcon closable onClose={() => onCloseMessage()} />;
    const successAlert = userData && <SuccessMessage description="Registration was successful!" closable={false}  />;
    const signUpForm = !successAlert && <FormSignUp userRegistration={userRegistration} />;
    return (
        <>
            {errorAlert}
            {successAlert}
            {signUpForm}
        </>
    );
};

export default SignUp;