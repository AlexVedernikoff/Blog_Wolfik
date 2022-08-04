import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import NewArticle from '../Article/NewArticle';
import { putArticleUpdate, getPostFull } from '../../services/Api';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';


function EditArticle() {
    const { slug } = useParams();

    const [articleTitle, setArticleTitle] = useState('');
    const [description, setDescription] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [tagList, setTagList] = useState([]);
    const [isSuccessAlert, setSuccessAlert] = useState(false);


    const updateFormData = () => {
        getPostFull(slug).then((res) => {
            setTagList(res.article.tagList);
            setDescription(res.article.description);
            setArticleTitle(res.article.title);
            setArticleBody(res.article.body);
        });
    };

    useEffect(() => {
        updateFormData();
    }, []);

    const articleUpdate = (val) => {
        const modifiedArticle = {
            title: val.title.trim(),
            description: val.description.trim(),
            body: val.body,
            tagList: val.tagList.map((el) => el.trim()).filter((el) => el && el !== ''),
        };

        putArticleUpdate(slug, modifiedArticle)
            .then((res) => {
                if (res.article) {
                    setSuccessAlert(true);

                    updateFormData();
                }
            });
    };

    const atCloseAletr = () => {
        setSuccessAlert(false);
    };

    const form = !isSuccessAlert && (
        <NewArticle
            title="Edit article"
            tagList={tagList}
            description={description}
            articleTitle={articleTitle}
            articleBody={articleBody}
            transferData={articleUpdate}
        />
    );

    const successAlert = isSuccessAlert && (
        <SuccessMessage description="Article update successfully!" closingAlert={atCloseAletr} closable={true} />
    );
    return (
        <>
            {successAlert}
            {form}
        </>
    );
}

export default EditArticle;