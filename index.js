import ReactDOM from 'react-dom/client';
import App, { router } from './App';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './src/store/AuthContext';
import { NotificationContextProvider } from './src/store/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthContextProvider>
        <NotificationContextProvider>
            <RouterProvider router={router} />
        </NotificationContextProvider>
    </AuthContextProvider>
);