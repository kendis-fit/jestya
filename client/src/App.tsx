import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./scss/main.scss";
import Users from "./components/Users";
import Login from "./components/Login";
import reducer from "./reducers/reducer";
import Auth from "./components/Auth/Auth";
import SectionList from "./components/SectionList";
import Registration from "./components/Registration";
import NotAvailable from "./components/NotAvailable";
import Projects from "./components/Projects/Projects";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Header from "./components/Header";

const store = createStore(reducer);

const App = () => {
	return (
		<Provider store={store}>
			<Auth>
				<BrowserRouter>
					<Switch>
						<PrivateRoute exact path={["/", "/login"]} component={Login} />
						<PrivateRoute exact path="/registration" component={Registration} />
						<Route exact path="/not-available" component={NotAvailable} />
						<Route path="/not-available/:page" render={(route) => <NotAvailable page={route.match.params.page} />} />
						<>
							<Header />
							<PrivateRoute exact path="/projects" component={Projects} />
							<PrivateRoute exact path="/projects/:id" component={SectionList} />
							<PrivateRoute exact path="/users" component={Users} />
							<PrivateRoute exact path="/create-user" component={Registration} />
							<Route path="/users/:id" />
						</>
					</Switch>
				</BrowserRouter>
			</Auth>
		</Provider>
	);
};

export default App;
