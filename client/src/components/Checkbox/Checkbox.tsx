import React, { HTMLAttributes } from "react";

export interface ICheckboxProps extends HTMLAttributes<HTMLInputElement> {
    label: string;
    isSwitch?: boolean;
    disabled?: boolean;
    checked?: boolean;
    name?: string;
}

const Checkbox = (props: ICheckboxProps) => {
    const { className, isSwitch, ...rest } = props;

    return (
        <div className={`form-check ${isSwitch ? "form-switch" : ""} ${className}`}>
            <input id={`checkbox-${props.name}`} name={props.name} className="form-check-input" type="checkbox" {...rest} />
            <label className="form-check-label" htmlFor={`checkbox-${props.name}`}>&nbsp;{rest.label}</label>
        </div>
    );
}

export default Checkbox;
