import React, { useState } from 'react';
import classes from './Login.module.css';
import Input from '../utils/Input';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPwd, setCnfPwd] = useState('');

    const usernameInputHandler = (e) => {
        setUsername(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('logging in for: ', { username: username, password: password });
        }
        else {
            console.log('signing up for: ', { username: username, password: password });
        }
    }

    return (
        <section className={classes.loginPage}>
            <article className={classes.loginModal} >
                <div className={classes.tabs}>
                    <div className={`${classes.header} ${isLogin && classes.selected}`} onClick={() => setIsLogin(true)}>Login</div>
                    <div className={`${classes.header} ${!isLogin && classes.selected}`} onClick={() => setIsLogin(false)}>Sign up</div>
                </div>
                <form onSubmit={submitHandler} className={classes.form}>
                    <Input label="UserName"
                        id="user"
                        type="text"
                        value={username}
                        onChange={usernameInputHandler}
                    />
                    <Input label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogin && <Input label="Confirm Password"
                        id="confirm"
                        type="text"
                        value={cnfPwd}
                        onChange={(e) => setCnfPwd(e.target.value)}
                    />}
                    {isLogin ?
                        <div className={classes.footer}>
                            <div>Not registered yet? <span onClick={() => setIsLogin(false)}>Sign Up</span></div>
                            <div>Forgot Password?</div>
                        </div> :
                        <div className={classes.footer}>
                            <div>Already an user? <span onClick={() => setIsLogin(true)}>Login</span></div>
                        </div>
                    }
                    <button type="submit" className={classes.button}>Submit</button>
                </form>
            </article>
        </section>
    )
}

export default Login