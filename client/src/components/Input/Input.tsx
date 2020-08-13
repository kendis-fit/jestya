import React from "react";

export interface IInputProps {
	name: string;
	type?:
		| "button"
		| "checkbox"
		| "file"
		| "hidden"
		| "image"
		| "password"
		| "radio"
		| "reset"
		| "submit"
		| "text";
	value?: any;
	onChange?: any;
	className?: string;
	heplerText?: string;
	label?: string;
	errors?: any;
	touched?: any;
}

const Input = (props: IInputProps) => {
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
