import React, { useEffect, useState } from 'react'

import classes from './GroupSettings.module.css';
import useHttp from '../hooks/use-http';
import { getGroup } from '../lib/api';
import { useParams } from 'react-router-dom';
import { iconColor, iconPicture } from '../static/constants';
import { AddMemberPopup } from './GroupDetails';

const GroupSettings = () => {
    const { groupId } = useParams();
    const { sendRequest, data, error, status } = useHttp(getGroup);
    const [groupData, setGroupData] = useState({});
    const [addMember, setAddMember] = useState(false);
    useEffect(() => {
        sendRequest(groupId);
    }, []);

    useEffect(() => {
        if (data) {
            setGroupData(data.groupDetails);
        }
    }, [data]);
    console.log(data);
    return (
        <section>
            <div className={classes.header}>
                <span style={{ color: iconColor[groupData?.category] || 'gray' }} className={`material-symbols-outlined ${classes.logo}`}>{iconPicture[groupData?.category] || 'error'}</span>
                <div className={classes.groupName}>
                    <div>{groupData.name}</div>
                    <div className={classes.groupCategory}>{groupData.category}</div>
                </div>
                <span className={`material-symbols-outlined ${classes.edit}`}>edit</span>
            </div>
            <div className={classes.members}>
                <div className={classes.title}>{`Group members (${groupData?.members?.length})`}</div>
                <div onClick={() => setAddMember(true)} className={classes.invite}>
                    <span className={`material-symbols-outlined`}>link</span>
                    <div>Invite via link</div>
                </div>
                <div className={classes.memeberList}>
                    {groupData.members && groupData.members.map(member => <div className={classes.member} key={member._id}>
                        <span className={`material-symbols-outlined`}>person</span>
                        <div className={classes.userDetails}>
                            <span>{member.username}</span>
                            <span className={classes.email}>{member?.email}</span>
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
            {addMember && <AddMemberPopup closePopup={() => setAddMember(false)} groupName={groupData.name} />}
        </section>
    )
}

export default GroupSettings;