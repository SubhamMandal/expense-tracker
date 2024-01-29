import { useEffect, useState } from 'react';
import classes from './Groups.module.css';
import useHttp from '../hooks/use-http';
import { getUserGroups } from '../lib/api';
import { iconColor, iconPicture } from '../static/constants';
import AddGroup from './AddGroup';
import { Link } from 'react-router-dom';
import Loader from '../utils/Loader';

const Groups = () => {
    const [addGroup, setAddGroup] = useState(false);
    const [userGroups, setUserGroups] = useState([]);
    const { sendRequest, error, status, data } = useHttp(getUserGroups);

    useEffect(() => {
        sendRequest();
    }, []);

    useEffect(() => {
        if (data?.userGroups) {
            setUserGroups(data?.userGroups);
        }
    }, [data])

    if (status === 'pending') {
        return <Loader />
    }

    if (error) {
        return <div>Oops! Could not fetch your groups</div>
    }
    return (
        <section>
            {addGroup && <AddGroup addGroupToList={(group) => { setUserGroups(prev => [...prev, group]) }} closePopup={() => setAddGroup(false)} />}
            <div className={classes.groups}>
                {userGroups.map(group => <Group key={group._id} group={group} />)}
            </div>
            <div onClick={() => setAddGroup(true)} className={classes.addGroupBtn} >
                <span className="material-symbols-outlined">group_add</span>
                Add Group
            </div>
        </section>
    )
}

export default Groups;

const Group = ({ group }) => {
    return (
        <Link to={group._id} className={classes.group}>
            <span
                style={{ color: iconColor[group.category] }}
                className="material-symbols-outlined">{iconPicture[group.category]}</span>
            <div>
                <div className={classes.groupName}>{group.name}</div>
                <div>Setteled up</div>
            </div>
        </Link>
    );
}
