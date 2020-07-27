import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./scss/main.scss";
import reducer from "./reducers/reducer";
import Auth from "./components/Auth/Auth";
import Projects from "./components/Projects/Projects";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Registration from "./components/Registration";
import Users from "./components/Users";
import PublicSignRoute from "./components/PublicSignRoute/PublicSignRoute";

const store = createStore(reducer);

const App = () => {
	return (
		<Provider store={store}>
			<Auth>
				<BrowserRouter>
					<Switch>
						
						<PublicSignRoute path="/login" />
						<PublicSignRoute path="/registration" />
						<PrivateRoute exact path="/projects" component={Projects} />
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
