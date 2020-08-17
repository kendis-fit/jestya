import React from "react";
import { IBaseInputProps } from "../Input/Input";

export interface ISelect extends IBaseInputProps {
	children: React.ReactNode;
}

const Select = (props: ISelect) => {
	const { errors, heplerText, label, className, touched, ...inputProps } = props;
	let isInvalid = false;

	if (errors) {
		isInvalid = Boolean(errors[props.name]) && Boolean(touched[props.name]);
	}

	return (
		<div className={"form-group " + className}>
			<label className="w-100">
				{label}
				<select
					{...inputProps}
					className={`form-select ${isInvalid ? "is-invalid" : ""}`}
				></select>
				<small className={`form-text  ${isInvalid ? "text-danger" : "text-muted"} `}>
					{isInvalid ? props.errors[props.name] : heplerText}
				</small>
			</label>
		</div>
	);
};

export default Select;
