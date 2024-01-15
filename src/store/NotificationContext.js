import { createContext, useState } from "react";

const NotificationContext = createContext({
    addNotification: () => { },
    removeNotification: () => { },
    list: [],
});

let toastId = 0;
export const NotificationContextProvider = (props) => {
    const [list, setList] = useState([]);

    const addNotification = (toast) => {
        const newToast = { ...toast, id: ++toastId };
        setList(prevList => [...prevList, newToast]);
    }

    const removeNotification = (id) => {
        setList(prevList => prevList.filter(toast => toast.id !== id));
    }

    const contextValue = {
        addNotification: addNotification,
        removeNotification: removeNotification,
        list: list
    }
    return <NotificationContext.Provider value={contextValue}>{props.children}</NotificationContext.Provider>
}

export default NotificationContext;