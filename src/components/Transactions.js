import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { getAllExpense } from '../lib/api';
import classes from './Transactions.module.css';
import NotificationContext from '../store/NotificationContext';
import { Link } from 'react-router-dom';

const monthText = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr' }

const processDate = (fullDate) => {
    const date = fullDate.split('-')[2];
    const month = monthText[fullDate.split('-')[1]];
    // return `${month} ${date}`;
    return <div>{month} <div style={{ fontSize: '1.75rem' }}>{date}</div></div>
}

const filterExpense = () => {

}

const Transactions = () => {
    const notificationCtx = useContext(NotificationContext);
    const { sendRequest, error, data, status } = useHttp(getAllExpense);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    useEffect(() => {
        sendRequest();
    }, [])

    useEffect(() => {
        if (error) {
            notificationCtx.addNotification({ type: 'fail', message: error })
        } else if (data) {
            setFilteredExpenses(data.allExpense)
        }
    }, [error, data])

    console.log(filteredExpenses)
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <section>
            <div className={classes.controls}></div>
            <label>filter</label>
            <select className={classes.dropdown}>
                <option>option1</option>
                <option>option2</option>
                <option>option3</option>
            </select>
            {!filteredExpenses.length ?
                <div className={classes.noExpense}>
                    No Expense to show
                    <Link to='/add-expense' className={classes.addExpense} >
                        <span className="material-symbols-outlined">add_notes</span>
                        Add Expense
                    </Link>
                </div> :
                <div className={classes.table}>
                    <div className={classes.tbody}>
                        {filteredExpenses.map(expense => <Link to={expense._id} key={expense._id} className={classes.row}>
                            <div className={`${classes.cell} ${classes.date}`} >{processDate(expense.date)}</div>
                            <div className={`${classes.cell} ${classes.description}`} >{expense.description}</div>
                            <div className={`${classes.cell} ${classes.amount}`} ><span className="material-symbols-outlined">currency_rupee</span>{expense.amount}</div>
                            {/* <div className={classes.cell} >{expense.catagory}</div> */}
                        </Link>)}
                    </div>
                </div>
            }
        </section>
    )
}

export default Transactions;