import React from "react";
import IInput from "./Interfaces";

const Input = (props: IInput) => {
	const { errors, heplerText, label, className, touched, ...inputProps } = props;
	let error = false;

	if (errors) {
		error = Boolean(errors[props.name]) && Boolean(touched[props.name]);
	}

	return (
		<div className={"form-group " + className}>
			<label className="w-100">
				{label}
				<input className={`form-control ${error ? "is-invalid" : " "}`} {...inputProps} />
				<small className={`form-text  ${error ? "text-danger" : "text-muted"} `}>
					{error ? props.errors[props.name] : heplerText}
				</small>
			</label>
		</div>
	);
};

export default Input;
