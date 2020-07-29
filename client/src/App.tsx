import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./scss/main.scss";
import Users from "./components/Users";
import Login from "./components/Login";
import reducer from "./reducers/reducer";
import Auth from "./components/Auth/Auth";
import Projects from "./components/Projects/Projects";
import Registration from "./components/Registration";
import SectionList from "./components/SectionList";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicSignRoute from "./components/PublicSignRoute/PublicSignRoute";

const store = createStore(reducer);

const App = () => {
	return (
		<Provider store={store}>
			<Auth>
				<BrowserRouter>
					<Switch>
						<PublicSignRoute exact path={["/", "/login"]} component={Login} />
						<PrivateRoute exact path="/registration" component={Registration} />
						<PrivateRoute exact path="/projects" component={Projects} />
						<PrivateRoute exact path="/projects/:id" component={SectionList} />
						<PrivateRoute exact path="/users" component={Users} />
						<Route path="/users/:id" />
					</Switch>
				</BrowserRouter>
			</Auth>
		</Provider>
	);
};

export default App;
