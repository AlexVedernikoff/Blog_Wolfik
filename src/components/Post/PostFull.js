import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'antd';
import { TailSpin } from 'react-loader-spinner';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux/es/exports';

import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { deleteArticle, getPostFull } from '../../services/Api';

import classes from './PostFull.module.scss';
import { PostItem } from './PostItem/PostItem';

export const PostFull = () => {
    const { slug } = useParams();
    const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };

    const { userData } = useStateUser();

    const [post, setPost] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false); // отобажение успех запроса
    const [controllerShow, setControllerShow] = useState(false);


    // подтвердить удаление
    const confirmDeletion = () => {
        // удаляет статью
        deleteArticle(slug, token).then((res) => {
            // если первый символ статуса 2 (OK)
            if (String(res.status)[0] === '2') {
                setIsSuccess(true);
            }
        });
    };

    useEffect(() => {
        setLoading(true);
        getPostFull(slug, token)
            .then((res) => {
                // показывает контроллер если пользователь залогинен и username в стор сопадает с автором статьи
                if (userData && userData.username === res.article.author.username) {
                    setControllerShow(true);
                }
                setPost(res.article);
                setLoading(false);
                setError(false);
            });
    }, [slug, userData, token]);

    const successMasege = isSuccess && (
        <SuccessMessage description="Article successfully removed!" closable={false} />
    );

    const article = !isSuccess && (<PostItem post={post} controllerFlag={controllerShow} confirmDeletion={confirmDeletion} />);

    return (
        <div style={{paddingTop: '24px'}}>
            {successMasege}
            {error
                ? <Alert className='alert' message='Something has gone wrong' type="error" showIcon />
                : null}
            {loading
                ? <TailSpin color='#00BFFF' height={80} width={80} />
                : !isSuccess && (
                    <div className={classes['post_item']}>
                        {article}
                        <div className={ classes['post_body']}><ReactMarkdown >{post.body}</ReactMarkdown></div>
                    </div>
                )
            };
        </div>
    );
};