import React from 'react';
import Logo from '../static/Images/logo.png';
import classes from './Layout.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children, hasBack }) => {
    const navigate = useNavigate();
    const onBackClick = () => {
        navigate(-1);
    }
    return (
        <section className={classes.home}>
            <Link to='/home' className={classes.header}>
                <img className={classes.logo} src={Logo} />
                <span>Expense-Tracker</span>
                {hasBack && <div className={classes.back} onClick={onBackClick}>
                    <span class="material-symbols-outlined">arrow_back</span>
                </div>}
            </Link>
            {children}
            <div className={classes.footer}>
                <span className="material-symbols-outlined">home</span>
                <span className="material-symbols-outlined">home</span>
                <span className="material-symbols-outlined">home</span>
                <span className="material-symbols-outlined">home</span>
            </div>
        </section>
    )
}

export default Layout;