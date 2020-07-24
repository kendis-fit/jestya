import React, { useState } from "react";
import { Formik } from "formik";
const Registration = () => {
	const [state, setState] = useState({ login: "", password: "" });
	// const [loginError, SetLoginError] = useState(true);

	const handleSubmiting = () => {
		// event.preventDefault();
		alert(JSON.stringify(state, null, 2));
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const initialValues = {
		a: "sd",
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
				<Formik initialValues={initialValues} onSubmit={handleSubmiting}>
					{props => (
						<form onSubmit={handleSubmiting}>
							<div className="form-group mb-3">
								<label className="w-100">
									Login
									<input
										className="form-control"
										name="login"
										value={state.login}
										onChange={handleChange}
									/>
									<small className="form-text text-muted">Type your login</small>
								</label>
							</div>
							<div className="form-group mb-3">
								<label className="w-100">
									Login
									<input
										className="form-control"
										name="login"
										value={state.login}
										onChange={handleChange}
									/>
									<small className="form-text text-muted">Type your login</small>
								</label>
							</div>
							<div className="form-group mb-3">
								<label className="w-100">
									Password
									<input
										type="password"
										className="form-control"
										name="password"
										value={state.password}
										onChange={handleChange}
									/>
									<small className="form-text text-muted ">Type your password</small>
								</label>
							</div>
							<div className="form-group mb-3">
								<label className="w-100">
									Password
									<input
										type="password"
										className="form-control"
										name="password"
										value={state.password}
										onChange={handleChange}
									/>
									<small className="form-text text-muted ">Type your password</small>
								</label>
							</div>
							<div className="form-group mb-3">
								<select className="form-select">
									<option value="">Choose...</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
								<small className="form-text text-muted ">Type your password</small>
							</div>

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
