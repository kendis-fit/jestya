import React from "react";
import { Formik } from "formik";

const Login = () => {
	const handleSubmiting = () => {};

	return (
		<div
			className="
			login
      		d-flex justify-content-center align-items-center"
		>
			<div
				className=" 
				login__container
				card 
				shadow p-3 mb-5 bg-white rounded "
			>
				{/* <div
					className="
					card-body
					 
					"
				> */}
				<h2 className="login__title title text-info text-center">Jestya</h2>
				<h3 className="text-center card-title">Log In</h3>
				<Formik initialValues={{ a: 1 }} onSubmit={() => {}}>
					{props => {
						return (
							<form action="">
								<div className="form-group mb-3">
									<label className="w-100">
										Login
										<input className="form-control w100" />
										<small className="form-text text-muted">Type your login</small>
									</label>
								</div>
								<div className="form-group mb-4">
									<label className="w-100">
										Password
										<input type="password" className="form-control" />
										<small className="form-text text-muted">Type your password</small>
									</label>
								</div>
								<button
									type="submit"
									className="
									btn btn-primary
									login__sumbitButton"
								>
									Log in
								</button>
							</form>
						);
					}}
				</Formik>
				{/* </div> */}
			</div>
		</div>
	);
};

export default Login;
