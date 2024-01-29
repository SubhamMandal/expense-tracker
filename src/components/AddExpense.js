import React, { useContext, useEffect, useState } from 'react';
import classes from './AddExpense.module.css';
import Input from '../utils/Input';
import useHttp from '../hooks/use-http';
import { addExpense } from '../lib/api';
import AuthContext from '../store/AuthContext';
import NotificationContext from '../store/NotificationContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem } from '../utils/Dropdown';
import Popup from '../utils/Popup';

const todayDate = new Date().toLocaleDateString('fr-ca');
const tags = ['Uncatagorised', 'Outing', 'Food', 'Grosyries', 'Rent', 'Investments'];
const processMembers = (members, loggedInUser) => {
    members.sort(function (x, y) { return x.username == loggedInUser ? -1 : y == loggedInUser ? 1 : 0; });
    members[0] = { ...members[0], username: 'You' };
    return members;
}
const AddExpense = () => {
    const { state } = useLocation()
    const authCtx = useContext(AuthContext);
    const { groupId, groupName, groupMembers } = state || {};
    const members = groupMembers && processMembers(groupMembers, authCtx.user?.username);
    const [date, setDate] = useState(todayDate);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState(members && members[0]?._id);
    const [split, setSplit] = useState('equally');
    const [type, setType] = useState(tags[0]);
    const [expenseSplitAmonut, setExpenseSplitAmonut] = useState([]);
    const [showSplitModal, setShowSplitModal] = useState(false);
    const { sendRequest, data, error, status } = useHttp(addExpense);
    const notificationCtx = useContext(NotificationContext);
    const isGroupExpense = groupId ? true : false;
    const navigate = useNavigate();

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

    const paidByHandler = (e) => {
        setPaidBy(e.target.value);
    }

    const splitHanlder = (e) => {
        setSplit(e.target.value);
        if (e.target.value !== 'equally') {
            setShowSplitModal(true);
        }
    }

    const addExpenseHandler = (e) => {
        e.preventDefault();
        const expenseData = {
            description: description,
            amount: amount || 0,
            date: date,
            type: type,
        }
        if (isGroupExpense) {
            expenseData.group = groupId;
            expenseData.paidBy = paidBy;
            expenseData.split = split;
            const splitAmount = split === 'equally' ? members.map((member) => { return { userId: member._id, amount: +amount / members.length } }) : expenseSplitAmonut;
            expenseData.splitAmount = splitAmount;
            const total = splitAmount.reduce((total, curr) => total += +curr.amount, 0);
            if (split !== 'equally' && +amount !== +total) {
                notificationCtx.addNotification({ type: 'fail', message: `The total of everyone's share is different than the total` });
                return;
            }
        }
        console.log('Expense added -> ', expenseData)
        sendRequest(expenseData, true);
    }

    useEffect(() => {
        if (!error && status === 'completed') {
            console.log(data);
            notificationCtx.addNotification({ type: 'success', message: 'Expense added successfully' });
            navigate(`/groups/${groupId}`);
        }
        if (error) {
            notificationCtx.addNotification({ type: 'fail', message: error });
        }
    }, [error, data, status]);

    const closePopupHandler = (total, values) => {
        setShowSplitModal(false);
        if (total != amount) {
            setSplit('equally');
        } else {
            setExpenseSplitAmonut(members.map((member, index) => { return { userId: member._id, amount: values[index] } }));
        }
    }
    return (
        <section>
            {showSplitModal && <ExpenseSplitPopup amount={amount} members={members} closePopup={closePopupHandler} />}
            <form onSubmit={addExpenseHandler} className={classes.addExpenseForm}>
                {isGroupExpense && <div>group: {groupName}</div>}
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
                    <Input id="date" label="Date" type="date" value={date} onChange={onDateChange} max={todayDate} />
                </div>
                {isGroupExpense &&
                    <div className={classes.group}>
                        <div className={classes.control}>
                            <label htmlFor='paidBy'>Paid By :</label>
                            <Dropdown id="paidBy" onChange={paidByHandler}>
                                {members.map(member => <DropdownItem key={member._id} label={member.username} value={member._id} />)}
                            </Dropdown>
                        </div>
                        <div className={classes.control}>
                            <label htmlFor='split'>Split :</label>
                            <Dropdown id="split" value={split} onChange={splitHanlder}>
                                <DropdownItem label="Equally" value="equally" />
                                <DropdownItem label="Unequal" value="unequal" />
                                {/* <DropdownItem label="Percentage" value="percentage" /> */}
                            </Dropdown>
                        </div>
                    </div>
                }
                <div className={classes.tags}>
                    {tags.map((tag, index) => <div className={classes.tag} key={index}>
                        <input name='tag' id={tag} type='radio' checked={tag === type} value={tag} onChange={onTypeChange} />
                        <label htmlFor={tag}>{tag}</label>
                    </div>)}
                </div>
                <div className={classes.addButton}>
                    <button type='submit' className={classes.button}>Add</button>
                </div>
            </form>
        </section>
    )
}

export default AddExpense;

const ExpenseSplitPopup = ({ members, amount, closePopup }) => {
    const [inputs, setInputs] = useState(new Array(members.length).fill(0));
    const [total, setTotal] = useState(0);

    const handleChange = (index, e) => {
        let newInputs = [...inputs];
        newInputs[index] = e.target.value;
        setInputs(newInputs);
        const sum = newInputs.reduce((sum, curr) => sum += +curr, 0);
        setTotal(sum);
    }

    const doneHandler = () => {
        +total === +amount && closePopup(total, inputs);
    }

    return (
        <Popup >
            <div className={classes.splitExpense}>
                <div className={classes.title}>Split by exact amount</div>
                <div className={classes.membersList}>
                    {members.map((member, index) => <div className={classes.userSplit} key={member._id}>
                        <div>{member?.username}</div>
                        <div>
                            <span className="material-symbols-outlined">currency_rupee</span>
                            <input type='number' placeholder='0' onChange={(e) => handleChange(index, e)} />
                        </div>
                    </div>)}
                </div>
                <div className={total > amount ? "red" : ""}>{+total} of {amount || 0}</div>
                {amount >= total ? <div>Remaing Amount: {+amount - +total}</div> :
                    <div className="red">You are over by {total - amount}</div>}
                <div className={classes.buttons}>
                    <button disabled={+total !== +amount} className={classes.done} onClick={doneHandler}>Done</button>
                    <button onClick={() => closePopup(total, inputs)}>Cancel</button>
                </div>
            </div>
        </Popup>
    )
}