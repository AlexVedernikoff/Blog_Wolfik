import axios from 'axios';

export const updateArticles = async (offset) => {
    const articles = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`);
    return articles.data;
};

export const getPostFull = async (slug, token) => {
    const url = new URL(`https://blog.kata.academy/api/articles/${slug}`);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    }).catch((err) => err.message);
    return response.json();
};

// добавляет новую статью
export const postCreateArticle = async (newArticle, token) => {
    const url = new URL('https://blog.kata.academy/api/articles');

    const body = {
        article: newArticle,
    };

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
    };

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
    }).catch((err) => err.message);

    return response.json();
};

export const deleteArticle = async (slug, token) => {
    const url = new URL(`https://blog.kata.academy/api/articles/${slug}`);

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    }).catch((err) => err.message);

    return response;
};

export const putArticleUpdate = async (slug, modifiedArticle, token) => {
    const url = new URL(`https://blog.kata.academy/api/articles/${slug}`);

    const body = {
        article: modifiedArticle,
    };

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
    };

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers,
    });

    return response.json();
};

// добавить в избранно (поставить лайк)
export const postAddFavorites = async (slug, token) => {
    const url = new URL(`https://blog.kata.academy/api/articles/${slug}/favorite`);

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers,
    });

    return response.json();
};

// удалить из избранного (удалить лайк)
export const deleteFavorites = async (slug, token) => {
    const url = new URL(`https://blog.kata.academy/api/articles/${slug}/favorite`);

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    }).catch((err) => err.message);

    return response.json();
};
