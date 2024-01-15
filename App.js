import { createBrowserRouter } from "react-router-dom";
import Login from "./src/components/Login"
import Home from "./src/components/Home";
import AddExpense from "./src/components/AddExpense";
import Layout from "./src/components/Layout";
import { useContext } from "react";
import AuthContext from "./src/store/AuthContext";
import Profile from "./src/components/Profile";
import Notification from "./src/utils/Notification";

const App = () => {
    const authCtx = useContext(AuthContext);
    return (
        <>
            <Notification />
            {authCtx.isLoggedIn ? <Layout><Home /></Layout> : <Login />}
        </>
    );
}

export default App;

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <div>404: page not found</div>
    },
    {
        path: 'home',
        element: <Layout><Home /></Layout>,
    },
    {
        path: 'add-expense',
        element: <Layout hasBack={true}><AddExpense /></Layout>,
    },
    {
        path: 'profile',
        element: <Layout hasBack={true}><Profile /></Layout>,
    },
    {
        path: 'groups',
        element: <Layout hasBack={true}><div>Groups</div></Layout>,
    }
]) 