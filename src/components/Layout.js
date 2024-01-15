import React from 'react';
import Logo from '../static/Images/logo.png';
import classes from './Layout.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoute';
import Notification from '../utils/Notification';

const Layout = ({ children, hasBack }) => {
    const navigate = useNavigate();
    const onBackClick = () => {
        navigate(-1);
    }
    return (
        <ProtectedRoute>
            <Notification />
            <section className={classes.home}>
                <Link to='/home' className={classes.header}>
                    <img className={classes.logo} src={Logo} />
                    <span>Expense-Tracker</span>
                    {hasBack && <div className={classes.back} onClick={onBackClick}>
                        <span className="material-symbols-outlined">arrow_back</span>
                    </div>}
                </Link>
                {children}
                <div className={classes.footer}>
                    <NavLink to='/home' className={({ isActive }) => isActive ? classes.active : ''}>
                        <span className="material-symbols-outlined">home</span>
                    </NavLink>
                    <NavLink to='/groups' className={({ isActive }) => isActive ? classes.active : ''}>
                        <span className="material-symbols-outlined">groups</span>
                    </NavLink>
                    <NavLink to='/home2' className={({ isActive }) => isActive ? classes.active : ''}>
                        <span className="material-symbols-outlined">home</span>
                    </NavLink>
                    <NavLink to='/profile' className={({ isActive }) => isActive ? classes.active : ''}>
                        <span className="material-symbols-outlined">person</span>
                    </NavLink>
                </div>
            </section>
        </ProtectedRoute>
    )
}

export default Layout;