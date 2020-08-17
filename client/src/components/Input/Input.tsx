import React from "react";

export interface IBaseInputProps {
	placeholder?: string;
	onChange?: any;
	heplerText?: string;
	label?: string;
	name: string;
	value?: any;
	className?: string;
	disabled?: boolean;
	required?: boolean;
	autofocus?: boolean;
	readOnly?: boolean;
	//formik
	touched?: any;
	errors?: any;
}

export interface IInputProps extends IBaseInputProps {
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
	maxlength?: number;
	minlength?: number;
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
				<input
					className={`form-control ${isInvalid ? "is-invalid" : " "}`}
					{...inputProps}
				/>
				<small className={`form-text  ${isInvalid ? "text-danger" : "text-muted"} `}>
					{isInvalid ? props.errors[props.name] : heplerText}
				</small>
			</label>
		</div>
	);
};

export default Input;
