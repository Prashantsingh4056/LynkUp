import { Navigate } from "react-router-dom";
import { getUserData } from "../Context/userContext";
import Loader from "./Loader";

function PublicRoute({ children }) {
    const { user, loading } = getUserData();

    if (loading) return <Loader />;

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;