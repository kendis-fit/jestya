import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../../context/auth";
import { IRoute } from "../PrivateRoute/PrivateRoute";
import Header from "../Header";

export interface IAdminRoute extends IRoute {
    roles: string[];
}

const PrivateAdminRoute = (props: IAdminRoute) => {
    const { auth } = useAuth();
    const { component: Component, ...rest } = props;
    
    if (!auth.isAuthenticated) {
        return <Redirect to="/login" />
    }
    if (!props.roles.includes(auth.user?.role as string)) {
        return <Redirect to={`/not-authorized${props.path}`} />
    }

    return <Route {...rest} render={route => {
        if (props.isHeader) {
            return <>
                {
                    props.isHeader ? <Header /> : null
                }
                <Component {...route.match.params} />
            </>
        }
        return <Component {...route.match.params} />
    }} />
}

export default PrivateAdminRoute;
