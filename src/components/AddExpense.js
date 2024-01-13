import React, { useState } from 'react';
import classes from './AddExpense.module.css';
import Input from '../utils/Input';

const todayDate = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`;
const AddExpense = () => {
    const [date, setDate] = useState(todayDate);
    const chaneDateHandler = (e) => {
        setDate(e.target.value);
    }
    const addExpenseHandler = (e) => {
        e.preventDefault();
    }
    return (
        <section>
            <form onSubmit={addExpenseHandler} className={classes.addExpenseForm}>
                <div className={classes.control}>
                    <span className="material-symbols-outlined">description</span>
                    <Input id="desc" label="Description" />
                </div>
                <div className={classes.control}>
                    <span className="material-symbols-outlined">currency_rupee</span>
                    <Input id="amt" label="Amount" type="number" />
                </div>
                <div className={classes.control}>
                    <span className="material-symbols-outlined">calendar_month</span>
                    <Input id="date" label="Date" type="date" value={date} onChange={chaneDateHandler} />
                </div>
                <button type='submit' className={classes.button}>Add</button>
            </form>
        </section>
    )
}

export default AddExpense;