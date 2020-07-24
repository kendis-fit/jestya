import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./scss/main.scss";
import Login from "./components/Login";
import reducer from "./reducers/reducer";
import Auth from "./components/Auth/Auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Registration from "./components/Registration/Registration";

const store = createStore(reducer);

const App = () => {
	return (
		<Provider store={store}>
			<Auth>
				<BrowserRouter>
					<Switch>
						<Route path="/login" component={Login} />
						<PrivateRoute path="/registration" component={Registration} />
						<Route exact path="/projects" />
						<Route path="/projects/:id" />
						<Route exact path="/users" />
						<Route path="/users/:id" />
					</Switch>
				</BrowserRouter>
			</Auth>
		</Provider>
	);
}

export default App;
