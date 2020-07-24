import React, { useState } from "react";

const Login = () => {
	const [state, setState] = useState({ login: "", password: "" });
	// const [loginError, SetLoginError] = useState(true);

	const handleSubmiting = (event: React.FormEvent) => {
		event.preventDefault();
		alert(JSON.stringify(state, null, 2));
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	// 201 object.tocin       

	return (
		<div className="login">
			<div
				className=" 
				login__container
				card 
				shadow p-3 mb-5 bg-white rounded "
			>
				<h2
					className="
					login__title
					title text-info text-center"
				>
					Jestya
				</h2>
				<h3 className="text-center card-title">Log In</h3>
				<form onSubmit={handleSubmiting}>
					<div className="alert alert-danger" role="alert">
						Can`t login. Invalid email or password.
					</div>
					<div className="form-group mb-3">
						<label className="w-100">
							Login
							<input className="form-control" name="login" value={state.login} onChange={handleChange} />
							<small className="form-text text-muted">Type your login</small>
						</label>
					</div>
					<div className="form-group mb-4">
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
					<button
						type="submit"
						className="
						login__sumbitButton
						btn btn-primary"
					>
						Log in
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
