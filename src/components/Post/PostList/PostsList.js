import { Pagination, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import './PostList.scss';
import { updateArticles } from '../../../services/Api';
import { PostItem } from '../PostItem/PostItem';

export const PostsList = () => {
    const [post, setPost] = useState([]);
    const [currentpage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postsUpdate();
    }, [currentpage]);

    const postsUpdate = async () => {
        try {
            setLoading(true);
            const posts = await updateArticles(currentpage * 5 - 5);
            setPost(posts.articles);
            setTotalArticles(posts.articlesCount * 2);
            setLoading(false);
        } catch (e) {
            setError(true);
            setLoading(false);
        }
    };

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className='post_list'>
                {error
                    ? <Alert className='alert' message='Something has gone wrong' type="error" showIcon />
                    : null}
                {loading
                    ? <TailSpin color='#00BFFF' height={80} width={80} />
                    : <PostItem post={post} />
                };
            </div>
            <Pagination current={currentpage} showSizeChanger={false} total={totalArticles} onChange={onChangePage} />
        </>
    );

};