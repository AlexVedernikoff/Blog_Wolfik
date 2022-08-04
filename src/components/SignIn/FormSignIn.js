// import { Form, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import classes from './FormSignIn.module.scss';

function FormSignIn({ userLogin }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = val => userLogin(val);

    return (
        <div className='form-sign'>
            <form onSubmit={handleSubmit(onSubmit)}
                className={classes['ant-form']}
            >
                <div className='form-title'>
                    <span>Sign In</span>
                </div>
                <label className='ant-form-item'>
                    <span>Email address</span>
                    <input placeholder="Email address"
                        className='ant-input'
                        {...register('email', { required: true })} />
                </label>
                <label className='ant-form-item'>
                    <span>Password</span>
                    <input type="password" placeholder="Password"
                        className='ant-input'
                        {...register('password', { required: true })} />
                </label>
                <button type="submit"
                    className='login-form-button'
                >
                    Login
                </button>
                <span className='input-content'>
                    Don’t have an account? <Link to="/sign-up" style={{ color: '#1890FF', textDecoration: 'none' }}>Sign Up</Link>.
                </span>
            </form>
        </div>
    );
};

export default FormSignIn;