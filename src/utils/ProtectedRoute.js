import { useContext, useEffect } from "react";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!authCtx.isLoggedIn) {
            navigate('/');
        }
    }, [authCtx.isLoggedIn]);
    return (
        <>
            {authCtx.isLoggedIn ? props.children : null}
        </>
    );
}

export default ProtectedRoute;