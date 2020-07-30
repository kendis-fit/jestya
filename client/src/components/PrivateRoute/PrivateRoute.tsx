import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../context/auth";
import NoUnauthenticatedRoute from "../NoUnauthenticatedRoute/NoUnauthenticatedRoute";

export interface IRoute {
    component: () => JSX.Element;
    path: string | string[];
    exact?: boolean;
}

const PrivateRoute = (props: IRoute) => {
    const { auth } = useAuth();
    const { component: Component, ...rest } = props;
    
    if (auth.isAuthenticated && ["/login", "/"].some(path => path === props.path)) {
        return <Redirect to="/projects" />
    }

    return(
        <Route {...rest} render={() => auth.isAuthenticated && props.path !== "/registration" ? <Component /> : <NoUnauthenticatedRoute />} />
    );
}

export default PrivateRoute;