import axios from 'axios';

import { baseUrl, headers } from '../constants';

export const updateArticles = async (offset) => {
    const articles = await axios.get(`${baseUrl}/articles?limit=5&offset=${offset}`);
    return articles.data;
};

export const getPostFull = async (slug) => {
    const url = new URL(`${baseUrl}/articles/${slug}`);
    const response = await fetch(url, {
        method: 'GET',
        headers,
    }).catch((err) => err.message);
    return response.json();
};

export const postCreateArticle = async (newArticle) => {
    const url = new URL(`${baseUrl}/articles`);

    const body = {
        article: newArticle,
    };

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
    }).catch((err) => err.message);

    return response.json();
};

export const deleteArticle = async (slug) => {
    const url = new URL(`${baseUrl}/articles/${slug}`);

    const response = await fetch(url, {
        method: 'DELETE',
        headers,
    }).catch((err) => err.message);

    return response;
};

export const putArticleUpdate = async (slug, modifiedArticle) => {
    const url = new URL(`${baseUrl}/articles/${slug}`);

    const body = {
        article: modifiedArticle,
    };

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers,
    });

    return response.json();
};

export const postAddFavorites = async (slug) => {
    const url = new URL(`${baseUrl}/articles/${slug}/favorite`);

    const response = await fetch(url, {
        method: 'POST',
        headers,
    });

    return response.json();
};

export const deleteFavorites = async (slug) => {
    const url = new URL(`${baseUrl}/articles/${slug}/favorite`);

    const response = await fetch(url, {
        method: 'DELETE',
        headers,
    }).catch((err) => err.message);

    return response.json();
};
