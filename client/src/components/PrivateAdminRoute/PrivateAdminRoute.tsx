import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../../context/auth";
import { IRoute } from "../PrivateRoute/PrivateRoute";

export interface IAdminRoute extends IRoute {
    roles: string[];
}

const PrivateAdminRoute = (props: IAdminRoute) => {
    const { auth } = useAuth();
    
    if (!auth.isAuthenticated) {
        return <Redirect to="/login" />
    }
    if (!props.roles.includes(auth.user?.role as string)) {
        return <Redirect to={`/not-authorized${props.path}`} />
    }

    return <Route {...props} />
}

export default PrivateAdminRoute;
