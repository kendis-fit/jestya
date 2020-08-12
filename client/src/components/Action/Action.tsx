import React from "react";
import { Link } from "react-router-dom";

export interface IAction {
    name: string;
    icon: string;
    path?: string;
    hideName?: boolean;
    onClick?: () => void;
}

const Action = (props: IAction) => {

    const renderIconAndText = () => {
        return (
            <>
                <span title={props.name} className="material-icons">{props.icon}</span>
                {
                    props.hideName ? null : <span className="action-link__title">{props.name}</span>
                }
            </>
        );
    }

    return (
        <li className="actions__item" onClick={props.onClick}>
            {
                props.path ? <Link to={props.path} className="action-link">
                    {renderIconAndText()}
                </Link> : 
                <div className="action-link action-link--close">
                    {renderIconAndText()}
                </div>
            }
        </li>
    );
}

export default Action;
