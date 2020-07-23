import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./scss/main.scss";
import Login from "./components/Login";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/registration" />
				<Route exact path="/projects" />
				<Route path="/projects/:id" />
				<Route exact path="/users" />
				<Route path="/users/:id" />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
