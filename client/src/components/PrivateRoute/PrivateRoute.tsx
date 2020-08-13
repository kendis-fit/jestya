import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../context/auth";
import NoUnauthenticatedRoute from "../NoUnauthenticatedRoute/NoUnauthenticatedRoute";
import Header from "../Header";
import ErrorBoundary from "../ErrorBoundary";

export interface IRoute {
    component: any;
    path: string | string[];
    exact?: boolean;
    isHeader?: boolean;
}

const PrivateRoute = (props: IRoute) => {
    const { auth } = useAuth();
    const { component: Component, ...rest } = props;
    
    if (auth.isAuthenticated && ["/login", "/"].some(path => path === props.path)) {
        return <Redirect to="/projects" />
    }

    return(
        <Route {...rest} render={(route) => {
            if (auth.isAuthenticated && props.path !== "/registration") {
                return <ErrorBoundary>
                    {
                        props.isHeader ? <Header /> : null
                    }
                    <Component {...route.match.params} />
                </ErrorBoundary>
            }
            return <NoUnauthenticatedRoute />
        }} />
    );
}

export default PrivateRoute;