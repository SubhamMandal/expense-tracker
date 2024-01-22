import { createContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    sessionTimeout: 0,
    user: null,
    updateUser: () => { },
});

let logoutTimeout;

const calculateRemainingDuration = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    return adjExpirationTime - currentTime;
}

const isSessionExisting = () => {
    const expirationTime = Number(localStorage.getItem('sessionTimeout'));
    const remainingDuration = calculateRemainingDuration(expirationTime);
    if (remainingDuration < 0) {
        localStorage.removeItem('sessionTimeout');
        localStorage.removeItem('userData');
    }
    return remainingDuration > 0;
}

export const AuthContextProvider = (props) => {
    const userIsLoggedIn = isSessionExisting();
    const [isLoggedIn, setIsLoggedIn] = useState(userIsLoggedIn);
    const [sessionTimeout, setSessionTimeout] = useState(0);
    const [user, setUser] = useState(null);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUser(null);
        document.cookie = `token=; expires=Sun, 13 Aug 2023 10:26:09 GMT;`;
        localStorage.removeItem('userData');
        localStorage.removeItem('sessionTimeout');
        clearTimeout(logoutTimeout);
    }, []);

    const login = (loginData) => {
        setIsLoggedIn(true);
        const expirationTime = loginData?.expirationTimeStamp;
        const remainingTime = calculateRemainingDuration(expirationTime);
        document.cookie = `token=${loginData.token}; expires=${new Date(expirationTime)};`;
        const userData = { ...loginData.userDetails };
        setUser(userData);
        setSessionTimeout(remainingTime);
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('sessionTimeout', expirationTime);
        logoutTimeout = setTimeout(logout, remainingTime);
    }

    useEffect(() => {
        if (userIsLoggedIn) {
            const expirationTime = Number(localStorage.getItem('sessionTimeout'));
            const remainingTime = calculateRemainingDuration(expirationTime);
            setSessionTimeout(remainingTime);
            setUser(JSON.parse(localStorage.getItem('userData')));
            logoutTimeout = setTimeout(logout, remainingTime);
        }
    }, [userIsLoggedIn, logout]);

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    }

    const contextValue = {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        sessionTimeout: sessionTimeout,
        user: user,
        updateUser: updateUser,
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;