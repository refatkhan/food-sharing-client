import React from 'react';
import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from '../provider/AuthProvider';
import Loader from '../pages/Loader';
const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    if (loading) return <Loader />;
    if (user) return children;
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
};

export default PrivateRoute;





