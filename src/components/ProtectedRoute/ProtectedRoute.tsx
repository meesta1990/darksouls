import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { ROUTER_SIGNIN } from "../../utils/Constants";

interface IProtectedRoute {
    children: ReactElement;
    user: any;
}

const ProtectedRoute = ({ children, user }: IProtectedRoute) => {
    return user ? children : <Navigate to={ROUTER_SIGNIN} />;
}

export default ProtectedRoute;
