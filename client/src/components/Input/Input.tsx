import React from "react";
import IInput from "./Interfaces";

const Input = (props: IInput) => {
	const { errors, heplerText, label, className, touched, ...inputProps } = props;
	let isInvalid = false;

	if (errors) {
		isInvalid = Boolean(errors[props.name]) && Boolean(touched[props.name]);
	}

	return (
		<div className={"form-group " + className}>
			<label className="w-100">
				{label}
				<input className={`form-control ${isInvalid ? "is-invalid" : " "}`} {...inputProps} />
				<small className={`form-text  ${isInvalid ? "text-danger" : "text-muted"} `}>
					{isInvalid ? props.errors[props.name] : heplerText}
				</small>
			</label>
		</div>
	);
};

export default Input;
