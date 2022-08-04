export const baseUrl = 'https://blog.kata.academy/api';

export const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${JSON.parse(localStorage.getItem('token')) || null}`,
};

export const baseRoute = '/';
export const articleRoute = '/articles';
export const signInRoute = '/sign-in';
export const signUpRoute = '/sign-up';
export const profileRoute = '/profile';
export const newArticleRoute = '/new-article';
export const slugRoute = '/:slug';
export const editRoute = '/edit';
