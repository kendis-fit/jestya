import React from "react";
import { IBaseInputProps } from "../Input/Input";

export interface ITextAreaProps extends IBaseInputProps {
	rows?: number;
	cols?: number;
	maxlength?: number;
	defaultValue?: string;
	height?: string;
	resize?: "none" | "both" | "horizontal" | "vertical" | "inherit";
}

const TextArea = (props: ITextAreaProps) => {
	const { errors, heplerText, label, resize, className, touched, height, ...inputProps } = props;
	let isInvalid = false;

	if (errors) {
		isInvalid = Boolean(errors[props.name]) && Boolean(touched[props.name]);
	}

	return (
		<div className={"form-group " + className}>
			<label className="w-100">
				{label}
				<textarea
					style={{ height: height, resize: resize }}
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

export default TextArea;
