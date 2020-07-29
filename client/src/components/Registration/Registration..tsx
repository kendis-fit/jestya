import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input";
import Select from "../Select";
import { useAuth } from "../../context/auth";

const SignupSchema = Yup.object().shape({
	name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
	login: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
	password: Yup.string().min(6, "Too Short!").max(50, "Too Long!").required("Required"),
	role: Yup.string().required("Required"),
});

interface IInitialRegistrationData {
	name: string;
	login: string;
	password: string;
	role: string;
}

//------Select data----
const FirstRegistrationSelect = [{ value: "SUPER_ADMIN", label: "Super Admin" }];
const SuperAdminSelect = [
	{ value: "", label: "Choose..." },
	{ value: "ADMIN", label: "Admin" },
	{ value: "USER", label: "User" },
];
const AdminSelect = [{ value: "USER", label: "User" }];
//---------------------

const Registration = () => {
	document.title = "Registration | JESTYA";
	const { auth } = useAuth();
	const handleSubmiting = (values: IInitialRegistrationData) => {
		alert(JSON.stringify(values, null, 2));
	};

	const SelectData = auth.user?.role
		? auth.user?.role === "SUPER_ADMIN"
			? SuperAdminSelect
			: AdminSelect
		: FirstRegistrationSelect;
	const initialValues = {
		name: "",
		login: "",
		password: "",
		role: auth.user?.role ? (auth.user?.role === "SUPER_ADMIN" ? "" : "USER") : "SUPER_ADMIN",
	};
	return (
		<div className="registration">
			<div
				className=" 
				registration__container
				card 
				shadow p-3 mb-5 bg-white rounded "
			>
				<h3 className="text-center card-title">
					{auth.user?.role ? "Creating of user" : "Registration of user"}
				</h3>
				<Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmiting}>
					{({ handleChange, handleSubmit, errors, touched, values }) => (
						<form onSubmit={handleSubmit}>
							<Input
								errors={errors}
								name="name"
								label="Name"
								value={values.name}
								touched={touched}
								onChange={handleChange}
								heplerText="Type user name"
								className="mb-3"
							/>
							<Input
								errors={errors}
								name="login"
								label="Login"
								value={values.login}
								touched={touched}
								onChange={handleChange}
								heplerText="Type user login"
								className="mb-3"
							/>
							<Input
								errors={errors}
								touched={touched}
								value={values.password}
								type="password"
								name="password"
								label="Password"
								onChange={handleChange}
								heplerText="Type user password"
								className="mb-3"
							/>
							<Select
								errors={errors}
								touched={touched}
								value={values.role}
								disabled={auth.user?.role === "ADMIN" ? true : false}
								label="User role"
								onChange={handleChange}
								name="role"
								className="mb-4"
								heplerText="Choose user role"
							>
								{SelectData.map((ell, i) => (
									<option key={i} value={ell.value} label={ell.label} />
								))}
							</Select>
							<button
								type="submit"
								className="
								registration__sumbitButton
                            	btn btn-primary"
							>
								{auth.user?.role ? "Create User" : "Register"}
							</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Registration;
