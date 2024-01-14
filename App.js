import { createBrowserRouter } from "react-router-dom";
import Login from "./src/components/Login"
import Home from "./src/components/Home";
import AddExpense from "./src/components/AddExpense";
import Layout from "./src/components/Layout";

const App = () => {
    return (
        <>
            {/* <Home /> */}
            <Login />
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
        element: <Layout hasBack={true}><div>Profile</div></Layout>,
    },
    {
        path: 'groups',
        element: <Layout hasBack={true}><div>Groups</div></Layout>,
    }
]) 