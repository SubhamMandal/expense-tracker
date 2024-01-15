import React from 'react';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <section className={classes.home}>
            <div className={classes.total}>
                Total monthly expense <div><span className="material-symbols-outlined">currency_rupee</span>567.3</div>
            </div>
            <Link to='/add-expense' className={classes.addExpense} >
                <span className="material-symbols-outlined">add_notes</span>
                Add Expense
            </Link>
        </section>
    )
}

export default Home