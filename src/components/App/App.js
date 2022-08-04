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
import { baseRoute, articleRoute, signInRoute, signUpRoute, profileRoute, newArticleRoute, slugRoute, editRoute } from '../../constants';

function App() {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const dispath = useDispatch();
    const { userData } = useStateUser();

    useEffect(() => {
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
                    <Route path={baseRoute} exact render={() => <Redirect to='/articles' />} />
                    <Route path={articleRoute} component={PostsList} exact />
                    <Route path={`${articleRoute}${slugRoute}`} exact render={({ match }) => {
                        const { id } = match.params;
                        return <PostFull itemId={id} />;
                    }} />
                    <Route path={signInRoute} component={SignIn} exact />
                    <Route path={signUpRoute} component={SignUp} exact />
                    <Route path={profileRoute} exact>{userData ? <Profile /> : <Redirect to={'/sign-in'} />}</Route>
                    <Route path={newArticleRoute} exact>{userData ? <CreateArticle /> : <Redirect to={'/sign-in'} />} </Route>
                    <Route path={`${articleRoute}${slugRoute}${editRoute}`} component={EditArticle} exact />
                </main>
            </div>
        </Router>
    );
}

export default App;
