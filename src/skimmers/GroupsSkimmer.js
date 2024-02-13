import classes from './GroupsSkimmer.module.css';

const GroupsSkimmer = () => {
    return (
        <section>
            <div className={classes.groups}>
                {[1, 2, 3, 4, 5, 6].map(index => <div className='shine' key={index} />)}
                </div>
        </section>
    )
}

export default GroupsSkimmer;