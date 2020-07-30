import React from "react";
import { Link } from "react-router-dom";

export interface IAction {
    name: string;
    path: string;
    icon: string;
    hideName?: boolean;
}

const Action = (props: IAction) => {
    return (
        <li className="actions__item">
            <Link to={props.path} className="action-link">
                <span title={props.name} className="material-icons">{props.icon}</span>
                {
                    props.hideName ? null : <span className="action-link__title">{props.name}</span>
                }
            </Link>
        </li>
    );
}

export default Action;
