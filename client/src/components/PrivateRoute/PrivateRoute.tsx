import React from "react";
import { Route } from "react-router-dom";

import { useAuth } from "../../context/auth";
import NonUnauthenticatedRoute from "../NonUnauthenticatedRoute/NonUnauthenticatedRoute";

export interface IPrivateRoute {
    component: () => JSX.Element;
    path: string | string[];
}

const PrivateRoute = (props: IPrivateRoute) => {
    const { auth } = useAuth();
    const { component: Component, ...rest } = props;
    
    return(
        <Route {...rest} render={() => auth.isAuthenticated ? <Component /> : <NonUnauthenticatedRoute />} />
    );
}

export default PrivateRoute;