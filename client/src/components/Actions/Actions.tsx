import React from "react";

import Action from "../Action/Action";
import { useAuth } from "../../context/auth";

const Actions = () => {
    const { auth } = useAuth();

    return(
        <ul className="actions w-50 pl-0">
            <Action path="/projects" icon="assignment" name="My project" />
            {
                auth.user?.role === "SUPER_ADMIN" ? <Action path="/" icon="person_add" name="Create user" /> : null
            }
        </ul>
    );
}

export default Actions;