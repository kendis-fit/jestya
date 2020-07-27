export default interface ISelect {
	name: string;
	value?: any;
	onChange?: any;
	className?: string;
	heplerText?: string;
	label?: string;
	children: any;
	disabled?: boolean;
	//formik
	touched?: any;
	errors?: any;
}
