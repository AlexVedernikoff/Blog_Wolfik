import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { useState, useEffect } from 'react';

import { ArticleController } from '../../ArticleController/ArticleController';
import { postAddFavorites, deleteFavorites } from '../../../services/Api';
import likeic from '../../../img/like.svg';
import nolike from '../../../img/nolike.svg';
import photo from '../../../img/photo.png';
import cutText from '../../../utils/CutText';
import { formatDate } from '../../../utils/FormatDate';

import classes from './PostItem.module.scss';

export const PostItem = ({ post, controllerFlag, confirmDeletion }) => {
    const { title, favoritesCount, favorited, tagList, author, description, createdAt, slug } = post;
    const paramSlug = `/articles/${slug}`;
    const tags = tagList.map((el, i) =>  <Tag className='post_tag' key={i}> {el} </Tag>);
    const authorAvatar = author.image;
    const avatar = authorAvatar === 'null' ? photo : authorAvatar;

    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };

    const { userData } = useStateUser();

    const [like, setLike] = useState(favorited);
    const [likeIcon, setLikeIcon] = useState(nolike);
    const [likeCount, setLikeCount] = useState(favoritesCount);
    const [isLikeDsabled, setLikeDsabled] = useState(true);

    useEffect(() => {
        if (post.favorited) {
            setLike(true);
            setLikeIcon(likeic);
        }

        if (userData) {
            setLikeDsabled(false);
        }
    }, [userData, post.favorited]);

    const onlikeClick = () => {
        if (!like) {
            postAddFavorites(slug).then((res) => {
                if (res.article.favorited) {
                    setLike(true);
                    setLikeIcon(likeic);
                    setLikeCount(res.article.favoritesCount);
                }
            });
        }
        else {
            deleteFavorites(slug).then((res) => {
                if (!res.article.favorited) {
                    setLike(false);
                    setLikeIcon(nolike);
                    setLikeCount(res.article.favoritesCount);
                }
            });
        }
    };

    return (
        <>
            <div className={classes['post_title']}>
                <Link to={paramSlug} className={classes['title_item']}>
                    {cutText(title)}
                </Link>
                <div className={classes['like_count']}>
                    <button
                        type="button"
                        className={classes['button-likes']}
                        onClick={onlikeClick}
                        disabled={isLikeDsabled}
                    >
                        <img className={classes['post_like']} src={likeIcon} alt='like' />{likeCount}
                    </button>
                </div>
            </div>
            <h4 className={classes['post_person']}>{author.username}
                <div className={classes['person_date']}>{formatDate(createdAt)}</div>
            </h4>
            <img src={avatar} className={classes['post_photo']} alt='profile' />
            <div className={classes['post_tags']}>{tags}</div>
            <p className={classes['post_description']}>
                {cutText(description)}
            </p>
            <ArticleController controllerFlag={controllerFlag} confirmDeletion={confirmDeletion} />
        </>
    );
};