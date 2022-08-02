import { Form, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';

import classes from './NewArticle.module.scss';

function NewArticle({ title, transferData, articleTitle, description, articleBody, tagList }) {

    const newFilds = [
        {
            name: ['title'],
            value: articleTitle || null,
        },
        {
            name: ['description'],
            value: description || null,
        },
        {
            name: ['body'],
            value: articleBody || null,
        },
        {
            name: ['tagList'],
            value: tagList && tagList.length ? tagList : [''],
        },
    ];

    const [fields, setFields] = useState(newFilds);

    useEffect(() => {
        setFields(newFilds);
    }, [title, description, articleTitle, articleBody, tagList]);

    return (
        <div className={classes['list__wrapper']}>
            <Form
                name="dynamic_form_item"
                layout="vertical"
                size="large"
                className={classes['ant-form-article']}
                onFinish={transferData}
                fields={fields}
            >
                <div className={classes['form-title']}>
                    <span>{title}</span>
                </div>
                <Form.Item
                    className={classes['form-item']}
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text" placeholder="Title" className={classes['ant-input']} />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Short description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text" placeholder="Short description" className={classes['ant-input']} />
                </Form.Item>

                <Form.Item
                    className={classes['ant-form-item']}
                    name="body"
                    label="Text"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea type="text" placeholder="Text" className={classes['ant-input-text-area']} />
                </Form.Item>

                <div className={classes['form-item-list__wrapper']}>
                    <Form.List name="tagList">
                        {(fieldsList, { add, remove }) => (
                            <>
                                {fieldsList.map((field, index) => (
                                    <Form.Item label={index === 0 ? 'Tags' : ''} className={classes['ant-form-item']} key={field.key}>
                                        <Form.Item {...field} noStyle>
                                            <Input placeholder="Tag" style={{ width: '40%' }} />
                                        </Form.Item>

                                        {fieldsList.length > 1 ? (
                                            <Button
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                                className={classes['form-item-list__del-button']}
                                            >
                                            Delete
                                            </Button>
                                        ) : null}
                                    </Form.Item>
                                ))}


                                <Form.Item className={classes['form-item-list__add-button']}>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                    >
                                    Add tag
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item className='ant-form-item'>
                        <Button type="primary" htmlType="submit" className={classes['form-item-list__send-button']}>
                        Send
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div> 
    );
};

export default NewArticle;