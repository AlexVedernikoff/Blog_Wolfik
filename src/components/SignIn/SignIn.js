
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import { useEffect } from 'react';

import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { fetchUserLogIn } from '../../store/userSlice';

import FormSignIn from './FormSignIn';

function SignIn() {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const dispath = useDispatch();
    const { error, userData } = useStateUser();

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

    const userLogin = (val) => {
        const newUser = {
            email: val.email.trim(),
            password: val.password.trim(),
        };
        dispath(fetchUserLogIn(newUser));
    };
    
    const successAlert = userData && <SuccessMessage description="Authorization was successful!" closable={false} />;
    const signInForm = !successAlert && <FormSignIn userLogin={userLogin} />;

    return (
        <>
            {error
                ? <Alert className='alert' message='Something has gone wrong' type="error" showIcon style={{ height: '50px' }} />
                : null}
            {successAlert}
            {signInForm}
        </>
    );
};

export default SignIn;