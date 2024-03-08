import { useContext } from 'react';
import classes from './Profile.module.css';
import AuthContext from '../store/AuthContext';
import ProfileImg from '../static/Images/profile.png';

const Profile = () => {
    const authCtx = useContext(AuthContext);
    const logoutHandler = () => {
        authCtx.logout();
    }
    return (
        <section className={classes.profilePage}>
            <h2 className={classes.title}>Account</h2>
            <div className={classes.accountSection}>
                <img className={classes.profileImg} src={ProfileImg} alt='user-image' />
                <div className={classes.userDetails}>
                    <div>{authCtx?.user?.username}</div>
                    <div>{authCtx?.user?.email}</div>
                </div>
                <span className="material-symbols-outlined">edit</span>
            </div>
            <div className={classes.feedback}>
                <span className={classes.header}>Feedback</span>
                <div><span className="material-symbols-outlined">star</span>Rate this app</div>
                <div><span className="material-symbols-outlined">support</span>Contact support</div>
            </div>
            <div className={classes.logout} onClick={logoutHandler}>logout</div>
            <div className={classes.copyright}>
                <p>Made by Subham Mandal</p>
                <p>Copyright &#169; 2024 Expense Tracker, Inc.</p>
                <p>v1.0.3/2024</p>
            </div>
            {/* <div>{authCtx?.user?.username}</div>
            <button onClick={logoutHandler}>logout</button> */}
        </section>
    )
}

export default Profile;