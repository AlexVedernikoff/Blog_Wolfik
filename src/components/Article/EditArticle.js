import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import NewArticle from '../Article/NewArticle';
import { putArticleUpdate, getPostFull } from '../../services/Api';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';


function EditArticle() {
    const { slug } = useParams(); // получает slug из роутера

    const [articleTitle, setArticleTitle] = useState('');
    const [description, setDescription] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [tagList, setTagList] = useState([]);

    const [isSuccessAlert, setSuccessAlert] = useState(false); 

    const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

    // обновляет данные в полях формы
    const updateFormData = () => {
        getPostFull(slug, token).then((res) => {
            setTagList(res.article.tagList);
            setDescription(res.article.description);
            setArticleTitle(res.article.title);
            setArticleBody(res.article.body);
        });
    };

    useEffect(() => {
        updateFormData();
    }, []);

    // обновляет статью
    const articleUpdate = (val) => {
        const modifiedArticle = {
            title: val.title.trim(),
            description: val.description.trim(),
            body: val.body,
            // любое положительное значение + удалит пробелы по краям
            tagList: val.tagList.map((el) => el.trim()).filter((el) => el && el !== ''),
        };

        putArticleUpdate(slug, modifiedArticle, token)
            .then((res) => {
                if (res.article) {
                    setSuccessAlert(true);

                    updateFormData(); // обновляет данные в форме
                }
            });
    };

    // при закрытии сообщения об успехе или ошибке
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