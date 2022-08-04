
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import { useEffect } from 'react';

import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { fetchUserLogIn, errorNull } from '../../store/userSlice';

import FormSignIn from './FormSignIn';

function SignIn() {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const dispath = useDispatch();
    const { error, userData } = useStateUser();

    useEffect(() => {
        if (userData && userData !== null) {
            localStorage.setItem('token', JSON.stringify(userData.token));
        }
    }, [userData]);

    const userLogin = (val) => {
        const newUser = {
            email: val.email.trim(),
            password: val.password.trim(),
        };
        dispath(fetchUserLogIn(newUser));
    };

    const onCloseMessage = () => {
        dispath(errorNull());
    };
    
    const errorAlert = error && <Alert description={error} type="error" showIcon closable onClose={() => onCloseMessage()} />;
    const successAlert = userData && <SuccessMessage description="Authorization was successful!" closable={false} />;
    const signInForm = !successAlert && <FormSignIn userLogin={userLogin} />;

    return (
        <>
            {errorAlert}
            {successAlert}
            {signInForm}
        </>
    );
};

export default SignIn;