import { useContext, useEffect } from 'react';
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

const Transactions = () => {
    const notificationCtx = useContext(NotificationContext);
    const { sendRequest, error, data, status } = useHttp(getAllExpense);
    useEffect(() => {
        sendRequest();
    }, [])

    useEffect(() => {
        if (error) {
            notificationCtx.addNotification({ type: 'fail', message: error })
        }
    }, [error])

    console.log(data)
    return (
        <section>
            {error && <div>{error}</div>}
            {!data?.allExpense.length ?
                <div className={classes.noExpense}>
                    No Expense to show
                    <Link to='/add-expense' className={classes.addExpense} >
                        <span className="material-symbols-outlined">add_notes</span>
                        Add Expense
                    </Link>
                </div> :
                <div className={classes.table}>
                    <div className={classes.tbody}>
                        {data?.allExpense.map(expense => <Link to={expense._id} key={expense._id} className={classes.row}>
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