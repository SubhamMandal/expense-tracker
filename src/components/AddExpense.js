import React, { useContext, useEffect, useState } from 'react';
import classes from './AddExpense.module.css';
import Input from '../utils/Input';
import useHttp from '../hooks/use-http';
import { addExpense } from '../lib/api';
import NotificationContext from '../store/NotificationContext';
import { useLocation } from 'react-router-dom';

const todayDate = new Date().toISOString().slice(0, 10);
const tags = ['Uncatagorised', 'Outing', 'Food', 'Grosyries', 'Rent', 'Investments'];
const AddExpense = () => {
    const { state } = useLocation()
    const { groupId, groupName } = state || {};
    const [date, setDate] = useState(todayDate);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState(tags[0]);
    const { sendRequest, data, error, status } = useHttp(addExpense);
    const notificationCtx = useContext(NotificationContext);

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const onAmountChange = (e) => {
        setAmount(e.target.value);
    }
    const onDateChange = (e) => {
        setDate(e.target.value);
    }
    const onTypeChange = (e) => {
        setType(e.target.value);
    }
    const addExpenseHandler = (e) => {
        e.preventDefault();
        const expenseData = {
            description: description,
            amount: amount,
            date: date,
            type: type,
            group: groupId
        }
        console.log('Expense added -> ', expenseData)
        sendRequest(expenseData, true);
    }

    useEffect(() => {
        if (!error && status === 'completed') {
            console.log(data);
            notificationCtx.addNotification({ type: 'success', message: 'Expense added successfully' });
            setAmount('');
            setDescription('');
            setType(tags[0]);
        } else {
            console.log(error);
        }
    }, [error, data, status]);
    return (
        <section>
            <form onSubmit={addExpenseHandler} className={classes.addExpenseForm}>
                <div>group: {groupName}</div>
                <div className={classes.control}>
                    <span className="material-symbols-outlined">description</span>
                    <Input id="desc" value={description} onChange={onDescriptionChange} label="Description" />
                </div>
                <div className={classes.control}>
                    <span className="material-symbols-outlined">currency_rupee</span>
                    <Input id="amt" label="Amount" value={amount} onChange={onAmountChange} type="number" />
                </div>
                <div className={classes.control}>
                    <span className="material-symbols-outlined">calendar_month</span>
                    <Input id="date" label="Date" type="date" value={date} onChange={onDateChange} />
                </div>
                <div className={classes.control}>
                    <button type='submit' className={classes.button}>Add</button>
                </div>
                <div className={classes.tags}>
                    {tags.map((tag, index) => <div className={classes.tag} key={index}>
                        <input name='tag' id={tag} type='radio' checked={tag === type} value={tag} onChange={onTypeChange} />
                        <label htmlFor={tag}>{tag}</label>
                    </div>)}
                </div>
            </form>
        </section>
    )
}

export default AddExpense;