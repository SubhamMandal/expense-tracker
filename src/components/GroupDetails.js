import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useHttp from '../hooks/use-http';
import { getGroup, getGroupExpenses as getExpeses } from '../lib/api';
import { iconColor, iconPicture } from '../static/constants';

import classes from './GroupDetails.module.css';
import Popup from '../utils/Popup';
import AuthContext from '../store/AuthContext';
import { currencyFormat } from '../helper';

const monthText = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr' }

const processDate = (fullDate) => {
    const date = fullDate.split('-')[2];
    const month = monthText[fullDate.split('-')[1]];
    // return `${month} ${date}`;
    return <div>{month} <div style={{ fontSize: '1.75rem' }}>{date}</div></div>
}

const filterExpense = (expenses, sortBy) => {
    let filteredExpenses = expenses || [];
    if (sortBy === 'date') {
        filteredExpenses = filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    } if (sortBy === 'description') {
        filteredExpenses = filteredExpenses.sort((a, b) => b[sortBy] < a[sortBy] ? 1 : -1);
    } else {
        filteredExpenses = filteredExpenses.sort((a, b) => b[sortBy] - a[sortBy]);
    }
    return filteredExpenses;
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

const GroupDetails = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const { sendRequest, data, error, status } = useHttp(getGroup);
    const { sendRequest: getGroupExpenses,
        data: groupExpenseData,
        error: groupExpenseError,
        status: groupExpenseStatus } = useHttp(getExpeses);
    const [groupData, setGroupData] = useState({});
    const [addMember, setAddMember] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const authCtx = useContext(AuthContext);

    const membersMap = useMemo(() => {
        const mapping = {};
        groupData?.members && groupData?.members.forEach(member => mapping[member._id] = member.username === authCtx.user.username ? 'You' : member.username);
        return mapping;
    }, [groupData.members]);

    useEffect(() => {
        sendRequest(groupId);
        getGroupExpenses(groupId);
    }, []);

    useEffect(() => {
        if (data) {
            setGroupData(data?.groupDetails);
        }
        if (groupExpenseData) {
            setExpenses(filterExpense(groupExpenseData.expenses, 'date') || []);
        }
    }, [data, groupExpenseData])

    return (
        <div>
            <header className={classes.header}>
                <span style={{ color: iconColor[groupData.category] }} className="material-symbols-outlined">{iconPicture[groupData.category]}</span>
                <h2>{groupData.name}</h2>
                <Link to={`/group-settings/${groupId}`} className="material-symbols-outlined">settings</Link>
            </header>
            <div className={classes.controls}>
                <div>Settle up</div>
                <div>Balances</div>
                <div>Total</div>
            </div>
            <div className={classes.table}>
                <div className={classes.tbody}>
                    {expenses.map(expense => <Link to={`/transactions/${expense._id}`} key={expense._id} className={classes.row}>
                        <div className={`${classes.cell} ${classes.date}`} >{processDate(expense.date)}</div>
                        <div className={`${classes.cell} ${classes.description}`} >
                            <div className={classes.expenseDesc}>{expense.description}</div>
                            <span className={classes.paidBy}>{membersMap[expense.paidBy]} paid {currencyFormat(expense.amount)}</span>
                        </div>
                        {/* <div className={`${classes.cell} ${classes.amount}`} ><span className="material-symbols-outlined">currency_rupee</span>{expense.amount}</div> */}
                        {expense.paidBy === authCtx.user?._id ?
                            <div className={`${classes.cell} ${classes.amount} green`} >
                                <div className={classes.amountType}>You lent</div>
                                <div>
                                    {currencyFormat(expense.amount - +getMyShare(expense.splitAmount, authCtx.user?._id))}
                                </div>
                            </div>
                            : <div className={`${classes.cell} ${classes.amount} red`} >
                                {getMyShare(expense.splitAmount, authCtx.user?._id) ?
                                    <>
                                        <div className={classes.amountType}>You borrowed</div>
                                        <div>
                                            {currencyFormat(getMyShare(expense.splitAmount, authCtx.user?._id))}
                                        </div>
                                    </> : <div className={classes.notInvolved}>Not involved</div>
                                }
                            </div>
                        }
                        {/* <div className={classes.cell} >{expense.catagory}</div> */}
                    </Link>)}
                </div>
            </div>
            {groupData?.members?.length > 1 && <div onClick={() => navigate('/add-expense', {
                state: { groupId, groupName: groupData.name, groupMembers: groupData.members }
            })} className={classes.addExpense} >
                <span className="material-symbols-outlined">add_notes</span>
                Add Expense
            </div>}
            {addMember && <AddMemberPopup closePopup={() => setAddMember(false)} groupName={groupData.name} />}
            {groupData?.members?.length < 2 && <div onClick={() => setAddMember(true)} className={classes.addMembers}>Add Members</div>}
        </div>
    )
}

export default GroupDetails;

export const AddMemberPopup = ({ closePopup, groupName }) => {
    let timer;
    const [copied, setCopied] = useState(false);
    const inputRef = useRef();
    const copyHandler = () => {
        navigator.clipboard.writeText(inputRef.current.value);
        setCopied(true);
        if (timer) clearInterval(timer);
        timer = setTimeout(() => setCopied(false), 5000);
    }
    let url = window.location.href.replace('groups', 'groups/join');
    url = window.location.href.replace('group-settings', 'groups/join');
    return (
        <Popup closePopup={closePopup}>
            <div>
                <div className={classes.caution}>Anyone can follow this link to join "{groupName}". Only share it with people you trust.</div>
                {/* <span className={classes.joinLink}>{url}</span> */}
                <input value={url} ref={inputRef} className={classes.joinLink} disabled />
                <div onClick={copyHandler} className={`${classes.btn} ${copied && classes.copied}`}>{copied ? 'Copied !' : 'Copy link'}</div>
            </div>
        </Popup>
    );
}