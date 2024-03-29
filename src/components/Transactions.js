import { useContext, useEffect, useRef, useState } from 'react';
import useHttp from '../hooks/use-http';
import { getAllExpense } from '../lib/api';
import classes from './Transactions.module.css';
import NotificationContext from '../store/NotificationContext';
import { Link } from 'react-router-dom';
import Loader from '../utils/Loader';
import { Dropdown, DropdownItem } from '../utils/Dropdown';
import AuthContext from '../store/AuthContext';
import { currencyFormat } from '../helper';
import TransactionsSkimmer from '../skimmers/TransactionsSkimmer';

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

const Transactions = () => {
    const notificationCtx = useContext(NotificationContext);
    const { sendRequest, error, data, status } = useHttp(getAllExpense);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [sortBy, setSortBy] = useState('date');
    useEffect(() => {
        sendRequest();
    }, [])

    useEffect(() => {
        const filtered = filterExpense(data?.allExpense, sortBy);
        setFilteredExpenses(filtered);
    }, [data]);

    const sortHandler = (e) => {
        setFilteredExpenses(prev => filterExpense(prev, e.target.value));
        setSortBy(e.target.value);
    }

    const deleteHanlder = (id) => {
        setFilteredExpenses(prev => prev.filter(expense => expense._id !== id));
    }

    if (error) {
        return <div>Opps! some error occured <div>{error}</div></div>;
    }
    
    if (status !== 'completed') {
        return <TransactionsSkimmer />
    }
    return (
        <section>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor='sortBy'>Sort by:</label>
                    <Dropdown value={sortBy} onChange={sortHandler} id='sortBy'>
                        <DropdownItem label="Date" value="date" />
                        <DropdownItem label="Amount" value="amount" />
                        <DropdownItem label="Description" value="description" />
                    </Dropdown>
                </div>
                <div className={classes.control}>
                    <label htmlFor='filter'>Filter:</label>
                    <Dropdown value={''} onChange={() => { }} id='filter'>
                        <DropdownItem label="All" value="all" />
                        <DropdownItem label="Group 1" value="group1" />
                        <DropdownItem label="Group 2" value="group2" />
                    </Dropdown>
                </div>
            </div>
            {!filteredExpenses?.length ?
                <div className={classes.noExpense}>
                    No Expense to show
                    <Link to='/add-expense' className={classes.addExpense} >
                        <span className="material-symbols-outlined">add_notes</span>
                        Add Expense
                    </Link>
                </div> :
                <div className={classes.table}>
                    <div className={classes.tbody}>
                        {filteredExpenses.map(expense => <Item key={expense._id} expense={expense} deleteExpense={deleteHanlder} />)}
                    </div>
                </div>
            }
        </section>
    )
}
let swipeBack;
export default Transactions;

const Item = ({ expense, deleteExpense }) => {
    const itemRef = useRef();
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;
    const authCtx = useContext(AuthContext);

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        if (isLeftSwipe) {
            itemRef.current.style.transform = "translate(-5rem)"
            swipeBack = setTimeout(() => { if (itemRef.current) itemRef.current.style.transform = "translate(0rem)" }, 3000);
        }
        else if (isRightSwipe) {
            itemRef.current.style.transform = "translate(0rem)";
            clearTimeout(swipeBack);
        }
    }
    // For desktop
    // let downX;
    // const onPointerMove = (e) => {
    //     const newX = e.clientX;
    //     // if (newX - downX < 10) {
    //     if (downX > newX) {
    //         itemRef.current.style.transform = "translate(-5rem)";
    //         setTimeout(() => { if (itemRef.current) itemRef.current.style.transform = "translate(0rem)" }, 2000);
    //     } else {
    //         itemRef.current.style.transform = "translate(0rem)";
    //     }
    //     itemRef.current.removeEventListener("pointermove", onPointerMove);
    // }
    // const onPointerDown = (e) => {
    //     console.log('pointerDown')
    //     e.stopPropagation();
    //     downX = e.clientX;
    //     itemRef.current.addEventListener("pointermove", onPointerMove);
    // }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper} ref={itemRef} // onPointerDown={onPointerDown}
                onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <Link to={expense._id} className={classes.row} >
                    <div className={`${classes.cell} ${classes.date}`} >{processDate(expense.date)}</div>
                    <div className={`${classes.cell} ${classes.description}`} >{expense.description}</div>
                    {!expense.associatedGroup ? <div className={`${classes.cell} ${classes.amount} black`} >
                        <div>Self expense</div>
                        <div>
                            {currencyFormat(expense.amount)}
                        </div>
                    </div>
                        : expense.paidBy === authCtx.user?._id ?
                            <div className={`${classes.cell} ${classes.amount} green`} >
                                <div>You lent</div>
                                <div>
                                    {currencyFormat(expense.amount - +getMyShare(expense.splitAmount, authCtx.user?._id))}
                                </div>
                            </div>
                            : <div className={`${classes.cell} ${classes.amount} red`} >
                                <div>You borrowed</div>
                                <div>
                                    {currencyFormat(getMyShare(expense.splitAmount, authCtx.user?._id))}
                                </div>
                            </div>
                    }
                </Link>
                <div className={classes.delete} onClick={() => deleteExpense(expense._id)} ><span className="material-symbols-outlined">delete</span></div>
            </div>
        </div>
    );
}