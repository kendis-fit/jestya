import React, { useState } from "react";

import Input from "../Input";
import { useAuth } from "../../context/auth";
import { Redirect } from "react-router-dom";
import resource from "../../api/resource";

const Login = () => {
	const { auth, setUser } = useAuth();
	const [state, setState] = useState({ login: "", password: "" });
	// const [loginError, SetLoginError] = useState(true);

	document.title = "Login | JESTYA";

	const handleSubmiting = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const user = await resource.auth.login(state);
			setUser?.(user);
		} catch {
			alert("ERROR");
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	if (auth.isAuthenticated) {
		return <Redirect to="/projects" />
	}

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
					<Input
						name="login"
						label="Name"
						value={state.login}
						onChange={handleChange}
						className="mb-3"
						heplerText="Type your login"
					/>
					<Input
						type="password"
						name="password"
						label="Password"
						value={state.password}
						onChange={handleChange}
						className="mb-4"
						heplerText="Type your password"
					/>
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
