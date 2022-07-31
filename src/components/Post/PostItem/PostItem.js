import { Tag } from 'antd';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';

import './PostItem.scss';
import like from '../../../img/like.svg';
import photo from '../../../img/photo.png';
import cutText from '../../../utils/CutText';
import { formatDate } from '../../../utils/FormatDate';

export const PostItem = ({ post }) => {
    return post.map(el => {
        const paramSlug = `/articles/${el.slug}`;
        console.log('params', paramSlug);
        const tags = el.tagList.map((el, i) => el.length !== 0 && <Tag className='post_tag' key={i}> {el} </Tag>);
        const authorAvatar = el.author.image;
        const avatar = authorAvatar === 'null' ? photo : authorAvatar;
        return (
            <div key={v4()} className='post_item'>
                <div className='post_title'>
                    <Link to={paramSlug} className='title_item'>
                        {cutText(el.title)}
                    </Link>
                    <div className='like_count'>
                        <img className='post_like' src={like} alt='like' />{el.favoritesCount}
                    </div>
                </div>
                <h4 className='post_person'>{el.author.username}
                    <div className='person_date'>{formatDate(el.createdAt)}</div>
                </h4>
                <img src={avatar} className='post_photo' alt='profile' />
                <div className='post_tags'>{tags}</div>
                <p className='post_description'>
                    {cutText(el.description)}
                </p>
            </div>
        );
    });

};