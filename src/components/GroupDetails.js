import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useHttp from '../hooks/use-http';
import { getGroup } from '../lib/api';

import classes from './GroupDetails.module.css';

const GroupDetails = () => {
    const { groupId } = useParams();
    const { sendRequest, data, error, status } = useHttp(getGroup);
    const [groupData, setGroupData] = useState({});

    useEffect(() => {
        sendRequest(groupId);
    }, []);

    useEffect(() => {
        if (data) {
            setGroupData(data.groupDetails);
        }
    }, [data])

    const navigate = useNavigate();

    return (
        <div>
            <h2>{groupData.name}</h2>
            {groupData?.members?.length > 1 ? <div onClick={() => navigate('/add-expense', { state: { groupId, groupName: groupData.name } })} className={classes.addMembers} >
                <span className="material-symbols-outlined">add_notes</span>
                Add Expense
            </div> : <div>Add members</div>}
        </div>
    )
}

export default GroupDetails