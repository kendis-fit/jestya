import React, { useState } from "react";

import Input from "../Input";
import { useAuth } from "../../context/auth";
import { Redirect } from "react-router-dom";
import resource from "../../api/resource";
import Content from "../Content";

const Login = () => {
	const { auth, setUser } = useAuth();
	const [state, setState] = useState({ login: "", password: "" });
	const [loginError, SetLoginError] = useState(false);

	document.title = "Login | JESTYA";

	const handleSubmiting = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const user = await resource.auth.login(state);
			setUser?.(user);
		} catch (error) {
			console.log("ERROR", error);
			SetLoginError(true);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	if (auth.isAuthenticated) {
		return <Redirect to="/projects" />;
	}

	return (
		<Content title="Log in" logo>
			<form onSubmit={handleSubmiting}>
				{loginError ? (
					<div className="alert alert-danger" role="alert">
						Can`t login. Invalid email or password.
					</div>
				) : null}

				<Input
					name="login"
					label="Login"
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
				<button type="submit" className="content__submit-button">Log in</button>
			</form>
		</Content>
	);
};

export default Login;
