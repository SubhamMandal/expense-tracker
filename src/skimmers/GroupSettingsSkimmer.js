import classes from './GroupSettingsSkimmer.module.css';

const GroupSettingsSkimmer = () => {
    return (
        <section>
            <div className={classes.header}>
                <span className={`material-symbols-outlined ${classes.logo} shine`}>error</span>
                <div className={classes.groupName}>
                    <div className='shine'></div>
                    <div className={`${classes.groupCategory} shine`}></div>
                </div>
                <span className={`material-symbols-outlined ${classes.edit}`}>edit</span>
            </div>
            <div className={classes.members}>
                <div className={classes.title}>{`Group members (0)`}</div>
                <div className={classes.invite}>
                    <span className={`material-symbols-outlined`}>link</span>
                    <div>Invite via link</div>
                </div>
                <div className={classes.memeberList}>
                    {[1,2,3,4,5].map(index => <div className={classes.member} key={index}>
                        <span className={`shine`}></span>
                        <div className={classes.userDetails}>
                            <span className='shine'></span>
                            <span className={`${classes.email} shine`}></span>
                        </div>
                    </div>)}
                </div>
            </div>
            <div className={classes.leave}>
                <span className={`material-symbols-outlined`}>exit_to_app</span>Leave Group
            </div>
            <div className={classes.delete}>
                <span className={`material-symbols-outlined`}>delete</span>Delete Group
            </div>
        </section>
    )
}

export default GroupSettingsSkimmer;