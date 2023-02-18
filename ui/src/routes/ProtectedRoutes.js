import { useNavigate, Link, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, token, role }) => {
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
