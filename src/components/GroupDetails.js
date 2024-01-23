import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useHttp from '../hooks/use-http';
import { getGroup } from '../lib/api';
import { BASE_URL, iconColor, iconPicture } from '../static/constants';

import classes from './GroupDetails.module.css';
import Popup from '../utils/Popup';

const GroupDetails = () => {
    const navigate = useNavigate();
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
    }, [data])

    return (
        <div>
            <header className={classes.header}>
                <span style={{ color: iconColor[groupData.category] }} className="material-symbols-outlined">{iconPicture[groupData.category]}</span>
                <h2>{groupData.name}</h2>
                <span className="material-symbols-outlined">settings</span>
            </header>
            <div className={classes.controls}>
                <div>Settle up</div>
                <div>Balances</div>
                <div>Total</div>
            </div>
            {groupData?.members?.length > 1 && <div onClick={() => navigate('/add-expense', {
                state: { groupId, groupName: groupData.name }
            })} className={classes.addExpense} >
                <span className="material-symbols-outlined">add_notes</span>
                Add Expense
            </div>}
            {addMember && <AddMemberPopup closePopup={() => setAddMember(false)} />}
            {groupData?.members?.length < 2 && <div onClick={() => setAddMember(true)} className={classes.addMembers}>Add Members</div>}
        </div>
    )
}

export default GroupDetails;

const AddMemberPopup = ({ closePopup }) => {
    let timer;
    const [copied, setCopied] = useState(false);
    const inputRef = useRef();
    const copyHandler = () => {
        navigator.clipboard.writeText(inputRef.current.value);
        setCopied(true);
        if (timer) clearInterval(timer);
        timer = setTimeout(() => setCopied(false), 5000);
    }
    const url = window.location.href.replace('groups', 'groups/join');
    return (
        <Popup closePopup={closePopup}>
            <div>
                {/* <span className={classes.joinLink}>{url}</span> */}
                <input value={url} ref={inputRef} className={classes.joinLink} disabled />
                <div onClick={copyHandler} className={`${classes.btn} ${copied && classes.copied}`}>{copied ? 'Copied !' : 'Copy link'}</div>
            </div>
        </Popup>
    );
}