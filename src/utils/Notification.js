import { useContext, useEffect, useState } from 'react';
import classes from './Notification.module.css';
import NotificationContext from '../store/NotificationContext';
import { createPortal } from 'react-dom';

const Notification = () => {
    const toastCtx = useContext(NotificationContext);
    const list = toastCtx.list;
    return createPortal(
        <article className={classes.notification}>
            {list.map((toast, index) => <Toast key={index} toast={toast} />)}
        </article>
        , document.getElementById('notification-panel')
    );
}

const Toast = ({ toast }) => {
    const toastCtx = useContext(NotificationContext);
    const removeNotificationHandler = () => {
        toastCtx.removeNotification(toast.id);
    }
    useEffect(() => {
        setTimeout(removeNotificationHandler, 2000);
    }, []);
    return (
        <div className={`${classes.toast} ${toast.type === 'success' ? classes.success : classes.fail}`}>
            <span onClick={removeNotificationHandler} className={classes.close}>&#10540;</span>
            {toast.type === 'success' ?
                <div className={classes.title}>&#10004; Success</div> :
                <div className={classes.title}>&#10008; Error</div>
            }
            <div className={classes.message}>{toast.message}</div>
        </div>
    );
}

export default Notification;