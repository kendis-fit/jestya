import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input";
import Select from "../Select";
import { useAuth } from "../../context/auth";
import resource from "../../api/resource";
import { Redirect } from "react-router-dom";
import { IUser } from "../../api/users";
import Content from "../Content";

const SignupSchema = Yup.object().shape({
	name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
	login: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
	password: Yup.string().min(9, "Too Short!").max(50, "Too Long!").required("Required"),
	role: Yup.string().required("Required"),
});

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
	const [isRedirected, setIsRedirected] = useState(false);
	const handleSubmiting = async (values: IUser) => {
		try {
			if (!auth.isAuthenticated) {
				await resource.auth.registration(values);
				setIsRedirected(true);
			} else {
				await resource.users.create(values);
				setIsRedirected(true);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const SelectData = auth.user?.role
		? auth.user?.role === "SUPER_ADMIN"
			? SuperAdminSelect
			: AdminSelect
		: FirstRegistrationSelect;
	const initialValues: IUser = {
		name: "",
		login: "",
		password: "",
		role: auth.user?.role ? "USER" : "SUPER_ADMIN",
	};

	if (isRedirected) {
		return <Redirect to="/login" />
	}

	return (
		<Content title={auth.user?.role ? "Creating of user" : "Registration of user"}>
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
						<button type="submit" className="content__submit-button btn btn-primary">
							{auth.user?.role ? "Create User" : "Register"}
						</button>
					</form>
				)}
			</Formik>
		</Content>
	);
};

export default Registration;
