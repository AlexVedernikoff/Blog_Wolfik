import { Form, Button, Input } from 'antd';

import classes from './FormProfile.module.scss';

function FormProfile({ editProfile }) {
    return (
        <div className='form-sign'>
            <Form
                name="dynamic_form_item"
                layout="vertical"
                size="large"
                className={classes['ant-form']}
                onFinish={editProfile}
            >
                <div className='form-title'>
                    <span>Edit Profile</span>
                </div>

                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Your username must be between 3 and 20 characters long.',
                            min: 3,
                            max: 20,
                        },
                    ]}
                >
                    <Input type="text" />
                </Form.Item>

                <Form.Item
                    label="Email address"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="New password"
                    rules={[
                        {
                            message: 'Your password must be between 6 and 40 characters long.',
                            min: 6,
                            max: 40,
                        },
                    ]}
                >
                    <Input.Password type="password" placeholder="New password" />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Avatar image (url)"
                    rules={[
                        {
                            type: 'url',
                            warningOnly: true,
                        },
                    ]}
                >
                    <Input placeholder="Avatar image" />
                </Form.Item>

                <Form.Item className='ant-form-item-control-input-content'>
                    <Button type="primary" htmlType="submit" className='login-form-button'>
                    Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormProfile;