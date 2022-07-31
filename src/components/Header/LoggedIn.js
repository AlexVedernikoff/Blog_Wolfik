import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logOutUser } from '../../store/userSlice';
import photo from '../../img/photo.png';

function LoggedIn() {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const { userData } = useStateUser();
    const { username, image } = userData;
    const dispath = useDispatch();

    const avatar = image || photo;

    const logOut = () => {
        try {
            // удаляет token из localStorage
            localStorage.removeItem('token');
            // и очищает данные пользователя в сторе
            dispath(logOutUser());
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className='header_btn'>
            <Link to="/new-article">
                <button type="button" className='user-data__button'>
                    Create article
                </button>
            </Link>
            <Link to="/profile">
                <div className='user-data__wrapper-inner'>
                    <span>{username}</span>
                    <img src={avatar} alt="avatar" />
                </div>
            </Link>
            <button className='button-logOut' tabIndex={0} onClick={logOut} onKeyDown={logOut}>Log Out </button>
        </div>
    );
};

export default LoggedIn;