import React from "react";
import ISelect from "./Interfaces";

const Select = (props: ISelect) => {
	const { errors, heplerText, label, className, touched, ...inputProps } = props;
	let error = false;

	if (errors) {
		error = Boolean(errors[props.name]) && Boolean(touched[props.name]);
	}

	return (
		<div className={"form-group " + className}>
			<label className="w-100">
				{label}
				<select {...inputProps} className={`form-select ${error ? "is-invalid" : ""}`}></select>
				<small className={`form-text  ${error ? "text-danger" : "text-muted"} `}>
					{error ? props.errors[props.name] : heplerText}
				</small>
			</label>
		</div>
	);
};

export default Select;
