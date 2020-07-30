import React from "react";

import Action from "../Action";
import { useAuth } from "../../context/auth";

const ProfileActions = () => {
    const { auth, setIsAuthenticated } = useAuth();

    const exitFromSystem = () => {
        setIsAuthenticated?.(false);
    }

    return(
        <div className="actions">
            <Action path={`/users/${auth.user?.id}`} icon="account_circle" name="Profile" hideName />
            <button className="btn btn-outline-light" onClick={exitFromSystem}>Log out</button>
        </div>
    );
}

export default ProfileActions;