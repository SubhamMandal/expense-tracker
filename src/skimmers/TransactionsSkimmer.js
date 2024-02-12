import { Dropdown, DropdownItem } from '../utils/Dropdown';
import classes from './TransactionsSkimmer.module.css';

const TransactionsSkimmer = () => {
    return (
        <section>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor='sortBy'>Sort by:</label>
                    <Dropdown><DropdownItem label="--select--" /></Dropdown>
                </div>
                <div className={classes.control}>
                    <label htmlFor='filter'>Filter:</label>
                    <Dropdown><DropdownItem label="--select--" /></Dropdown>
                </div>
            </div>
            <div className={classes.table}>
                <div className={classes.tbody}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(index => <Item key={index} />)}
                </div>
            </div>
        </section>
    )
}
export default TransactionsSkimmer;

const Item = () => {
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <a className={classes.row} >
                    <div className={`${classes.cell} ${classes.date} shine`} ></div>
                    <div className={`${classes.cell} ${classes.description} shine`} ></div>
                    <div className={`${classes.cell} ${classes.amount} shine`} ></div>
                </a>
            </div>
        </div>
    );
}