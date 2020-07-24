import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import NonUnauthenticatedRoute from "../NonUnauthenticatedRoute/NonUnauthenticatedRoute";

export interface IPrivateRoute {
    component: () => JSX.Element;
    path: string | string[];
}

const PrivateRoute = (props: IPrivateRoute) => {
    const {} = useSelector(() => {});
    const { component: Component, ...rest } = props;
    
    return(
        <Route {...rest} render={() => isAuthenticated ? <Component /> : <NonUnauthenticatedRoute />} />
    );
}

export default PrivateRoute;