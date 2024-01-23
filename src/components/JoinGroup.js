import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../store/AuthContext';
import Login from './Login';
import { useNavigate, useParams } from 'react-router-dom';
import { getGroup, joinGroup as joinGroupApi } from '../lib/api';
import useHttp from '../hooks/use-http';
import Layout from './Layout';
import NotificationContext from '../store/NotificationContext';

import classes from './JoinGroup.module.css';

const JoinGroup = () => {
    const authCtx = useContext(AuthContext);
    const { sendRequest, data: groupDetails } = useHttp(getGroup);
    const { sendRequest: join, data: joinGroupData, error, status: joinStatus } = useHttp(joinGroupApi);
    const [groupData, setGroupData] = useState({});
    // const [joinGroup, setJoinGroup] = useState(false);
    const { groupId } = useParams();
    const navigate = useNavigate();
    const notificationCtx = useContext(NotificationContext);

    useEffect(() => {
        sendRequest(groupId);
    }, [])

    useEffect(() => {
        if (joinGroupData) {
            notificationCtx.addNotification({ type: 'success', message: 'Joined group successfully' });
            navigate(`/groups/${groupId}`);
        }
    }, [joinGroupData])

    useEffect(() => {
        if (error) {
            notificationCtx.addNotification({ type: 'fail', message: error })
        }
    }, [error])

    // useEffect(() => {
    //     if (authCtx.isLoggedIn && joinGroup) {
    //         join(groupId);
    //     }
    // }, [authCtx.isLoggedIn, joinGroup]);

    useEffect(() => {
        if (groupDetails?.groupDetails) {
            setGroupData(groupDetails.groupDetails);
        }
    }, [groupDetails])

    const joinButtonHandler = () => {
        join(groupId);
        // setJoinGroup(true);
        // setTimeout(() => { setJoinGroup(false) }, 5000);
    }

    return (
        <div>
            {authCtx.isLoggedIn ? <Layout>
                {groupData.name}
                <div onClick={joinButtonHandler} className={`${classes.joinGroupBtn} ${joinStatus === 'pending' && classes.clicked}`}>Join Group</div>
            </Layout> :
                <div>
                    <div>Please Login to join group</div>
                    <Login />
                </div>}
        </div>
    )
}

export default JoinGroup;