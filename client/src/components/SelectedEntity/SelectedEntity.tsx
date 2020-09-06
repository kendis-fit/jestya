import React from "react";

export interface ISelectedEntityProps {
    name: string;
    onClose: () => void;
}

const SelectedEntity = (props: ISelectedEntityProps) => {
    return(
        <div className="selected-entity">
            <span>{props.name}</span>
            <span className="material-icons" onClick={() => props.onClose()}>close</span>
        </div>
    );
}

export default SelectedEntity;
