import React from 'react';
import Logo from '../static/Images/logo.png';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <section className={classes.home}>
            <Link to='/add-expense' className={classes.addExpense} >
                <span className="material-symbols-outlined">add_notes</span>
                Add Expense
            </Link>
        </section>
    )
}

export default Home