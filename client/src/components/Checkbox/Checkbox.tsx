import React from "react";

export interface ICheckboxProps {
    label: string;
    isSwitch?: boolean;
    disabled?: boolean;
    checked?: boolean;
    name?: string;
    onChange?: (e: any) => void;
}

const Checkbox = (props: ICheckboxProps) => {
    return (
        <div className={`form-check ${props.isSwitch ? "form-switch" : ""}`}>
            <input name={props.name} className="form-check-input" type="checkbox" {...props} />
            <label className="form-check-label">{props.label}</label>
        </div>
    );
}

export default Checkbox;
