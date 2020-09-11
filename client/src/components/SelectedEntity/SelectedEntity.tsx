import React from "react";

export interface ISelectedEntityProps {
    name: string;
    onClose: () => void;
}

const SelectedEntity = (props: ISelectedEntityProps) => {
    return(
        <div className="selected-entity">
            <span>{props.name}</span>
            <span className="material-icons selected-entity__close" onClick={() => props.onClose()}>close</span>
        </div>
    );
}

export default SelectedEntity;
