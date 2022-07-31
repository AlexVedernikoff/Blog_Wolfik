
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';

import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { fetchUserRegistration } from '../../store/userSlice';

import FormSignUp from './FormSignUp';

function SignUp() {
    // const [error, setError] = useState(false);
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const dispath = useDispatch();
    const {  userData, error } = useStateUser();

    useEffect(() => {
        try {
            // если есть днные о юзере, то сохраняет токен в хранилище
            if (userData && userData !== null) {
                localStorage.setItem('token', JSON.stringify(userData.token));
            }
        } catch (e) {
            console.log(e);
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
    // сообщение об успешной регистрации
    const successAlert = userData && <SuccessMessage description="Registration was successful!" closable={false}  />;
    const signUpForm = !successAlert && <FormSignUp userRegistration={userRegistration} />;
    return (
        <>
            {error
                ? <Alert className='alert' message='Something has gone wrong' type="error" showIcon style ={{height: '50px'}} />
                : null}
            {successAlert}
            {signUpForm}
        </>
    );
};

export default SignUp;