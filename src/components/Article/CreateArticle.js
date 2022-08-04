import { useState } from 'react';

import { postCreateArticle } from '../../services/Api';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

import NewArticle from './NewArticle';

function CreateArticle() {
    const [isSuccessAlert, setSuccessAlert] = useState(false);

    const createArticle = (val) => {
        const newArticle = {
            title: val.title.trim(),
            description: val.description.trim(),
            body: val.body,
            tagList: val.tagList.map((el) => el.trim()).filter((el) => el && el !== ''),
        };

        postCreateArticle(newArticle)
            .then((res) => {
                if (res.article) {
                    setSuccessAlert(true);
                }
            });
    };

    const atCloseAletr = () => {
        setSuccessAlert(false);
    };

    const form = !isSuccessAlert && (
        <NewArticle transferData={createArticle} title="Create new article" />
    );

    const successAlert = isSuccessAlert && (
        <SuccessMessage description="Article created successfully!" closingAlert={atCloseAletr} closable />
    );
    return (
        <>
            {successAlert}
            {form}
        </>
    );
}

export default CreateArticle;