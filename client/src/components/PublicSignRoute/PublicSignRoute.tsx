import React from "react";
import { Redirect } from "react-router-dom";

import Login from "../Login";
import { useAuth } from "../../context/auth";
import NoUnauthenticatedRoute from "../NoUnauthenticatedRoute/NoUnauthenticatedRoute";

export interface IRoute {
    path: "/login" | "/registration";
}

const PublicSignRoute = (props: IRoute) => {
    const { auth } = useAuth();

    if (auth.isAuthenticated) {
        return <Redirect to="/projects" />
    }

    if (props.path === "/login") {
        return <Login />
    }
    return <NoUnauthenticatedRoute />
}

export default PublicSignRoute;