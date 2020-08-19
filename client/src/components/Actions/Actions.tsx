import React, { useRef } from "react";

import Action from "../Action/Action";
import { useAuth } from "../../context/auth";



const Actions = () => {
    const { auth } = useAuth();
    const menuRef = useRef<HTMLUListElement>(null);

    const hideShowMenu = () => {
        if (menuRef && menuRef.current) {
            menuRef.current.classList.toggle("actions--menu-show")
        }
    }

    return(
        <ul id="menu" ref={menuRef} className="actions actions--menu-hide">
            <Action path="/projects" icon="assignment" name="My projects" />
            {
                auth.user?.role === "SUPER_ADMIN" ||
                auth.user?.role === "ADMIN" ? 
                    <>
                        <Action path="/create-user" icon="person_add" name="Create user" />
                        <Action path="/add-user" icon="group_add" name="Add user to project" />
                    </>
                    : null
            }
            <Action icon="close" name="Close" onClick={hideShowMenu} />
        </ul>
    );
}

export default Actions;
