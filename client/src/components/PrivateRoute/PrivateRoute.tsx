import React from "react";
import { Route } from "react-router-dom";

import { useAuth } from "../../context/auth";
import NoUnauthenticatedRoute from "../NoUnauthenticatedRoute/NoUnauthenticatedRoute";

export interface IPrivateRoute {
    component: () => JSX.Element;
    path: string | string[];
    exact?: boolean;
}

const PrivateRoute = (props: IPrivateRoute) => {
    const { auth } = useAuth();
    const { component: Component, ...rest } = props;
    
    return(
        <Route {...rest} render={() => auth.isAuthenticated ? <Component /> : <NoUnauthenticatedRoute />} />
    );
}

export default PrivateRoute;