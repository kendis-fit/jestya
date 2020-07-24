export default interface IInput {
	name: string;
	type?: "button" | "checkbox" | "file" | "hidden" | "image" | "password" | "radio" | "reset" | "submit" | "text";
	value?: any;
	onChange?: any;
	className?: string;
	heplerText?: string;
	label?: string;
	errors?: any;
	touched?: any;
}
