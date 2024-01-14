import React, { useContext, useEffect, useState } from 'react';
import classes from './Login.module.css';
import Input from '../utils/Input';
import useHttp from '../hooks/use-http';
import { loginUser, signUpUser } from '../lib/api';
import AuthContext from '../store/AuthContext';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPwd, setCnfPwd] = useState('');
    const requestType = isLogin ? loginUser : signUpUser;
    const { sendRequest, data, status, error } = useHttp(requestType);
    const authCtx = useContext(AuthContext);

    const usernameInputHandler = (e) => {
        setUsername(e.target.value);
    }

    const emailInputHandler = (e) => {
        setEmail(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (isLogin) {
            const userData = {
                username: username,
                password: password
            };
            console.log('logging in for: ', userData);
            sendRequest(userData, true);
        }
        else {
            const userData = {
                email: email,
                username: username,
                password: password
            };
            console.log('signing up for: ', userData);
            sendRequest(userData, true);
        }
    }

    useEffect(() => {
        if (!error && status === 'completed') {
            if (isLogin) {
                authCtx.login(data);
            }
            else {
                setIsLogin(true);
                setPassword('');
                setCnfPwd('');
            }
        }
    }, [error, status]);

    return (
        <section className={classes.loginPage}>
            <article className={classes.loginModal} >
                <div className={classes.tabs}>
                    <div className={`${classes.header} ${isLogin && classes.selected}`} onClick={() => setIsLogin(true)}>Login</div>
                    <div className={`${classes.header} ${!isLogin && classes.selected}`} onClick={() => setIsLogin(false)}>Sign up</div>
                </div>
                <form onSubmit={submitHandler} className={classes.form}>
                    {!isLogin && <Input label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={emailInputHandler}
                    />}
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