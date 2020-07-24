import React from "react";
import { Formik } from "formik";
import IRegistration from "./Interfaces";
import * as Yup from "yup";
import Input from "../Input";
import Select from "../Select";

const SignupSchema = Yup.object().shape({
	name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
	login: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
	password: Yup.string().min(6, "Too Short!").max(50, "Too Long!").required("Required"),
	role: Yup.string().required("Required"),
});

const Registration = () => {
	// const [loginError, SetLoginError] = useState(true);

	document.title = "Registration | JESTYA";

	const handleSubmiting = (values: IRegistration) => {
		alert(JSON.stringify(values, null, 2));
	};

	const initialValues = {
		name: "",
		login: "",
		password: "",
		role: "",
	};

	return (
		<div className="login">
			<div
				className=" 
				login__container
				card 
				shadow p-3 mb-5 bg-white rounded "
			>
				<h3 className="text-center card-title">Registration of user</h3>
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
								label="login"
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
								onChange={handleChange}
								name="role"
								className="mb-4"
								heplerText="Choose user role"
							>
								<option value="" label="Choose.." />
								<option value="1" label="Super Admin" />
								<option value="2" label="Admin" />
								<option value="3" label="User" />
							</Select>
							<button
								type="submit"
								className="
                            login__sumbitButton
                            btn btn-primary"
							>
								Register
							</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Registration;
