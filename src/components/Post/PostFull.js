import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Tag } from 'antd';
import { TailSpin } from 'react-loader-spinner';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux/es/exports';

import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { deleteArticle, getPostFull } from '../../services/Api';
import { ArticleController } from '../ArticleController/ArticleController';
import like from '../../img/like.svg';
import { formatDate } from '../../utils/FormatDate';

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
                console.log('res in getarticle', res.article);
                setPost(res.article);
                setLoading(false);
                setError(false);
                console.log('POSTUSEEFFECT', post);
            });
    }, [slug, userData, token]);
    console.log('POST', post);

    const successMasege = isSuccess && (
        <SuccessMessage description="Article successfully removed!" closable={false} />
    );

    return (
        <div>
            {successMasege}
            {error
                ? <Alert className='alert' message='Something has gone wrong' type="error" showIcon />
                : null}
            {loading
                ? <TailSpin color='#00BFFF' height={80} width={80} />
                : !isSuccess && (
                    <article>
                        <div className='post_list'>
                            <div className='post_item article_item'>
                                <div className='post_title'>
                                    <h3 className='title_item'>
                                        {post.title}
                                    </h3>
                                    <div className='like_count'>
                                        <img className='post_like' src={like} alt='like' />{post.favoritesCount}
                                    </div>
                                </div>
                                <h4 className='post_person'>{post.author.username}
                                    <div className='person_date'>{formatDate(post.createdAt)}</div>
                                </h4>
                                <img src={post.author.image} className='post_photo' alt='profile' />
                                <div className='post_tags'>{post.tagList.map((el, i) => el.length !== 0 && <Tag className='post_tag' key={i}> {el} </Tag>)}</div>
                                <p className='post_description'>
                                    {post.description}
                                </p>
                                <ArticleController controllerFlag={controllerShow} confirmDeletion={confirmDeletion} />
                                <div ><ReactMarkdown >{post.body}</ReactMarkdown></div>
                            </div>
                        </div>
                    </article>)
            };
        </div>
    );
};