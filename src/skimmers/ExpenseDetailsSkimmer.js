import React from 'react'

import classes from './ExpenseDetailsSkimmer.module.css';

const ExpenseDetailsSkimmer = () => {
    return (
        <div className={classes.expenseDetails}>
            <div className={classes.head}>
                <div className={`${classes.description}`}>
                    <div className={`${classes.desc} ${classes.shine}`}></div>
                    <span className={classes.shine}></span>
                </div>
                <span className={`material-symbols-outlined  ${classes.shine} ${classes.logo}`}></span>
                <span className={`material-symbols-outlined ${classes.icon} red`}>delete</span>
                <span className={`material-symbols-outlined ${classes.icon}`}>edit</span>
            </div>
            <div className={classes.header}>
                <div className={`${classes.amount} ${classes.shine}`}></div>
                <div className={classes.shine}></div>
            </div>

            <div>
                <div className={classes.list}>
                    <div className={classes.shine}></div>
                    {[1, 2, 3].map(index => <div key={index} className={classes.shine}></div>)}
                </div>
                <div className={`${classes.summary} ${classes.shine}`}></div>
            </div>
        </div>
    )
}

export default ExpenseDetailsSkimmer;