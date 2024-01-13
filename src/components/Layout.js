import React from 'react';
import Logo from '../static/Images/logo.png';
import classes from './Layout.module.css';
import { Link } from 'react-router-dom';

const Layout = ({children}) => {

    return (
        <section className={classes.home}>
            <Link className={classes.header}>
                <img className={classes.logo} src={Logo} />
                <span>Expense-Tracker</span>
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