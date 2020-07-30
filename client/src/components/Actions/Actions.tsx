import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/auth";

const Actions = () => {
    const { auth } = useAuth();

    return(
        <ul className="actions">
            <li className="actions__item">
                <Link to="/projects" className="action-link">
                    <span className="material-icons">assignment</span>
                    <span className="action-link__title">My projects</span>
                </Link>
            </li>
            {
                auth?.user?.role === "SUPER_ADMIN" && <li className="actions__item">
                    <Link to="/" className="actions__link">
                        <span className="material-icons">person_add</span>
                        <span className="action-link__title">Create user</span>
                    </Link>
                </li>
            }
        </ul>
    );
}

export default Actions;