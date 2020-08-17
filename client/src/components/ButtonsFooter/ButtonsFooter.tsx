import React from "react";

export interface IButtonsFooter {
    titlePrimary?: string;
    titleSecondary?: string;
    hideSecondary?: boolean;
    onClose?: () => void;
    onOk?: () => void;
}

const ButtonsFooter = (props: IButtonsFooter) => {
    return(
        <>
            <button type="button" onClick={props.onClose} className="btn btn-secondary" data-dismiss="modal">{props.titleSecondary || "Close"}</button>
            <button type="button" onClick={props.onOk} className="btn btn-dark">{props.titlePrimary || "Ok"}</button>
        </> 
    );
}

export default ButtonsFooter;