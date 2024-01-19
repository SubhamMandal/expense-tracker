import { useContext, useEffect, useState } from "react";
import NotificationContext from "../store/NotificationContext";
import { addGroup } from "../lib/api";
import useHttp from "../hooks/use-http";
import Popup from "../utils/Popup";
import Input from "../utils/Input";

import { categories } from "../static/constants";
import classes from './AddGroup.module.css';

const AddGroup = ({ closePopup, addGroupToList }) => {
    const { sendRequest, error, status, data } = useHttp(addGroup);
    const [groupName, setGroupName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Others');
    const notificationCtx = useContext(NotificationContext);

    const addGroupHandler = () => {
        sendRequest({ groupName: groupName, category: selectedCategory }, true);
    }

    useEffect(() => {
        if (!error && status === 'completed') {
            notificationCtx.addNotification({ type: 'success', message: 'Group added successfully' });
            closePopup();
            addGroupToList(data?.group);
        }
        if (error) {
            notificationCtx.addNotification({ type: 'fail', message: error });
        }
    }, [error, status])
    return (
        <Popup closePopup={closePopup}>
            <div className={classes.addGroup}>
                <Input onChange={(e) => setGroupName(e.target.value)}
                    label="Group Name"
                    value={groupName}
                    type="text"
                    id="grpName" />
                <label>Choose Category</label>
                <div className={classes.categories}>
                    {categories.map(({ iconName, category }) =>
                        <Icon key={iconName}
                            iconName={iconName}
                            onChange={() => setSelectedCategory(category)}
                            label={category}
                            checked={category === selectedCategory}
                        />
                    )}
                </div>
                <button onClick={addGroupHandler} className={classes.button}>Create</button>
            </div>
        </Popup>
    );
}

export default AddGroup;

const Icon = ({ iconName, label, onChange, checked }) => (<>
    <label htmlFor={iconName} className={classes.category}>
        <span className="material-symbols-outlined">{iconName}</span>
        {label}
    </label>
    <input type="radio" onChange={onChange} checked={checked} name="category" id={iconName} />
</>);
