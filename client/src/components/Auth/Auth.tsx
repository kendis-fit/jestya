import React, { useState } from "react";

import { AuthContext, Auth as AuthModel, User } from "../../context/auth";

export interface IAuth {
    children?: any;
}

const setDefaultAuth = () => {
    const existsUser = localStorage["user"];

    if (existsUser) {
        const user = JSON.parse(existsUser);
        return new AuthModel(true, user);
    }
    return new AuthModel(false);
}

const Auth = (props: IAuth) => {
    const [auth, setAuth] = useState<AuthModel>(setDefaultAuth());

    const removeUser = () => {
        delete localStorage["user"];
    }

    const setIsAuthenticated = (isAuthenticated: boolean) => {
        let user: User | undefined;
        if (!isAuthenticated) {
            removeUser();
            user = undefined;
        } else {
            user = auth?.user;
        }
        setAuth(new AuthModel(isAuthenticated, user));
    }

    const setUser = (user: User) => {
        localStorage["user"] = JSON.stringify(user);
        setAuth(new AuthModel(true, user));
    }

    return(
        <AuthContext.Provider value={{ auth, setIsAuthenticated, setUser }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default Auth;