import classes from './GroupDetailsSkimmer.module.css';

const GroupDetailsSkimmer = () => {
    return (
        <div>
            <header className={classes.header}>
                <span className="material-symbols-outlined">person</span>
                <h2 className='shine'></h2>
                <span className="material-symbols-outlined">settings</span>
            </header>
            <div className={classes.controls}>
                <div>Settle up</div>
                <div>Balances</div>
                <div>Total</div>
            </div>
            <div className={classes.table}>
                <div className={classes.tbody}>
                    {[1, 2, 3, 4, 5, 6].map(index => <a key={index} className={classes.row}>
                        <div className={`${classes.cell} ${classes.date} shine`} ></div>
                        <div className={`${classes.cell} ${classes.description}`} >
                            <div className={`${classes.expenseDesc} shine`}></div>
                            <span className={`${classes.paidBy} shine`}></span>
                        </div>
                        <div className={`${classes.notInvolved} shine`}></div>
                    </a>)}
                </div>
            </div>
        </div>
    )
}

export default GroupDetailsSkimmer;