import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getExpenseDetails } from '../lib/api';
import Loader from '../utils/Loader';
import AuthContext from '../store/AuthContext';
import { currencyFormat } from '../helper';
import { iconPicture } from '../static/constants';

import classes from './ExpenseDetails.module.css';

const monthText = ['Jan', 'Feb', 'Mar', 'Apr'];

const processDate = (fullDate) => {
    const date = new Date(fullDate);
    return `${date.getDate()}-${monthText[date.getMonth()]}-${date.getFullYear()}`;
}

const getMyShare = (arr, user) => {
    let val = 0;
    arr && arr.forEach(curr => {
        if (curr.userId === user) {
            val = curr.amount;
        }
    })
    return val;
}

const ExpenseDetails = () => {
    const { expenseId } = useParams();
    const [expense, setExpense] = useState({});
    const [members, setMembers] = useState([]);
    const { sendRequest, data, error, status } = useHttp(getExpenseDetails);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        sendRequest(expenseId);
    }, []);

    useEffect(() => {
        if (data) {
            setExpense(data.expenseData);
            const membersMap = {};
            data.users && data.users.forEach(user => membersMap[user._id] = authCtx.user.username === user.username ? 'You' : user.username);
            setMembers(membersMap);
        }
    }, [data]);

    if (error) {
        return <div>Opps! Something went wrong! {error}</div>
    }
    console.log({ data }, authCtx.user)

    return (
        <div className={classes.expenseDetails}>
            {status === 'pending' && <Loader />}
            <div className={classes.head}>
                <div className={classes.description}>{expense?.description}<span>{expense.catagory}</span></div>
                <span className={`material-symbols-outlined ${classes.logo}`}>{iconPicture[data?.catagory] || 'person'}</span>
                <span className={`material-symbols-outlined ${classes.icon} red`}>delete</span>
                <span className={`material-symbols-outlined ${classes.icon}`}>edit</span>
            </div>
            <div>{expense?.groupName}</div>
            <div className={classes.header}>
                <div className={classes.amount}>{currencyFormat(expense?.amount)}</div>
                <div>Added by {members[expense?.creator] || 'You'} on {processDate(expense?.date)}</div>
            </div>
            {expense?.associatedGroup &&
                <div>
                    <div className={classes.list}>
                        <div>{members[expense.paidBy]} paid {currencyFormat(expense.amount)}</div>
                        {expense.splitAmount && expense?.splitAmount.map(member => <div key={member._id}>{members[member.userId]} {members[member.userId] === 'You' ? 'owe' : 'owes'} <span>{currencyFormat(member.amount)}</span></div>)}
                    </div>
                    {expense.paidBy === authCtx.user?._id ?
                        <div className={classes.summary}>You are owed <span className="green">{currencyFormat(expense.amount - +getMyShare(expense.splitAmount, authCtx.user?._id))}</span></div>
                        : <div className={classes.summary}>
                            {getMyShare(expense.splitAmount, authCtx.user?._id) ?
                                <>You <span>owe</span> {members[expense.paidBy]} <span className="red">{currencyFormat(getMyShare(expense.splitAmount, authCtx.user?._id))}</span></>
                                : <>You are not involved</>}
                        </div>
                    }
                </div>}
        </div>
    )
}

export default ExpenseDetails;