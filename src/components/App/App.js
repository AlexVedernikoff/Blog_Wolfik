import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import './App.scss';
import { PostsList } from '../Post/PostList/PostsList';
import { PostFull } from '../Post/PostFull';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Header from '../Header/Header';
import { Profile } from '../Profile/Profile';
import { fetchUserSave } from '../../store/userSlice';
import CreateArticle from '../Article/CreateArticle';
import EditArticle from '../Article/EditArticle';

function App() {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const dispath = useDispatch();
    const { userData } = useStateUser();

    useEffect(() => {
        // если токен есть то получаем данные пользователя с его использованием
        if (JSON.parse(localStorage.getItem('token'))) {
            dispath(fetchUserSave(JSON.parse(localStorage.getItem('token'))));
        }
    }, [dispath]);

    return (
        <Router>
            <div className="app">
                <header className="app_header">
                    <Link to='/' className='header_name'> Realworld Blog </Link>
                    <Header />
                </header>
                <main className='app_main'>
                    <Route path='/' exact render={() => <Redirect to='/articles' />} />
                    <Route path='/articles' component={PostsList} exact />
                    <Route path='/articles/:slug' exact render={({ match }) => {
                        const { id } = match.params;
                        return <PostFull itemId={id} />;
                    }} />
                    <Route path="/sign-in" component={SignIn} exact />
                    <Route path="/sign-up" component={SignUp} exact />
                    <Route path="/profile" exact>{userData ? <Profile /> : <Redirect to={'/sign-in'} />}</Route>
                    <Route path="/new-article" component={CreateArticle} exact />
                    <Route path="/articles/:slug/edit" component={EditArticle} exact />
                </main>
            </div>
        </Router>
    );
}

export default App;
