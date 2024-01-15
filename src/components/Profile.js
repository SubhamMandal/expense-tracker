import { useContext } from 'react';
import classes from './Profile.module.css';
import AuthContext from '../store/AuthContext';

const Profile = () => {
    const authCtx = useContext(AuthContext);
    const logoutHandler = () => {
        authCtx.logout();
    }
    return (
        <section>
            <div>{authCtx?.user?.username}</div>
            <button onClick={logoutHandler}>logout</button>
        </section>
    )
}

export default Profile;