import React from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "../../context/auth";
import { IRoute } from "../PrivateRoute/PrivateRoute";
import NoUnauthenticatedRoute from "../NoUnauthenticatedRoute/NoUnauthenticatedRoute";

const PublicSignRoute = (props: IRoute) => {
    const { auth } = useAuth();
    const { component: Component } = props;

    if (auth.isAuthenticated) {
        return <Redirect to="/projects" />
    }

    if (props.path === "/login") {
        return <Component />
    }
    return <NoUnauthenticatedRoute />
}

export default PublicSignRoute;