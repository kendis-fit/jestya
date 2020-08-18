import React from "react";

export interface IInputModalProps {
    name: string;
    label: string;
    value: any;
    onChange: (e: any) => void;
    placeholder?: string;
    error?: string;
    touched?: boolean;
    type?: string;
}

const InputModal = (props: IInputModalProps) => {
    return(
        <div className="input-modal_wrapper">
            <label htmlFor={props.name} className="form-label">{props.label}</label>
            <input placeholder={props.placeholder} name={props.name} onChange={props.onChange} type={props.type} className={`form-control ${props.error ? "form-control.isInvalid" : ""}`} id={props.name} value={props.value} />
            <div className={`${props.error && props.touched ? "text-danger" : ""}`}>
                {props.error && props.touched ? props.error : " "}
            </div>
        </div>
    );
}

export default InputModal;
