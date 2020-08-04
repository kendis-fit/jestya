import React from "react";

import Action from "../Action";
import { useAuth } from "../../context/auth";
import Search from "../Search";

const ProfileActions = () => {
    const { auth, setIsAuthenticated } = useAuth();

    const exitFromSystem = () => {
        setIsAuthenticated?.(false);
    }

    return(
        <ul className="actions">
            <Search />
            <Action path={`/users/${auth.user?.id}`} icon="account_circle" name="Profile" hideName />
            <button className="btn btn-outline-light" onClick={exitFromSystem}>Log out</button>
        </ul>
    );
}

export default ProfileActions;