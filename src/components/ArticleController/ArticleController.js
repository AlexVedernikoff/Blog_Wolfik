import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Popconfirm, Button } from 'antd';
import { useSelector } from 'react-redux/es/exports';

import 'antd/dist/antd.min.css';
import styles from './ArticleController.module.scss';

const ArticleController = ({ controllerFlag, confirmDeletion }) => {

    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };

    const { userData } = useStateUser();

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const { slug } = useParams();

    const showPopconfirm = () => {
        setVisible(true);
    };

    const handleOk = () => {
        confirmDeletion();

        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 500);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const deleteButton = (
        <Popconfirm
            placement="right"
            title="Are you sure to delete this article?"
            visible={visible}
            onConfirm={handleOk}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            cancelText="No"
            okText="Yes"
        >
            <Button type="primary" onClick={showPopconfirm} className={styles['controller-button__del']}>
                Delete
            </Button>
        </Popconfirm>
    );

    const paramSlug = `/articles/${slug}/edit`;

    const controler =
        controllerFlag && userData ? (
            <div className={styles['controller-wrapper']}>
                {deleteButton}
                <Link to={paramSlug} className={styles['controller-button__edit']}>
                    <span>Edit</span>
                </Link>
            </div>
        ) : null;

    return controler;
};

export { ArticleController };