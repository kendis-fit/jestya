import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./scss/main.scss";
import Login from "./components/Login";
import reducer from "./reducers/reducer";
import Auth from "./components/Auth/Auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Registration from "./components/Registration";
import Projects from "./components/Projects";
import Users from "./components/Users";

const store = createStore(reducer);

const App = () => {
	return (
		<Provider store={store}>
			<Auth>
				<BrowserRouter>
					<Switch>
						<Route path="/login" component={Login} />
						<PrivateRoute path="/registration" component={Registration} />
						<Route exact path="/projects" component={Projects} />
						<Route path="/projects/:id" />
						<Route exact path="/users" component={Users} />
						<Route path="/users/:id" />
					</Switch>
				</BrowserRouter>
			</Auth>
		</Provider>
	);
};

export default App;
