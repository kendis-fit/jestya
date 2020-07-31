import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./scss/main.scss";
import Users from "./components/Users";
import Login from "./components/Login";
import reducer from "./reducers/reducer";
import Header from "./components/Header";
import Auth from "./components/Auth/Auth";
import SectionList from "./components/SectionList";
import Registration from "./components/Registration";
import NotAvailable from "./components/NotAvailable";
import Projects from "./components/Projects/Projects";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const store = createStore(reducer);

const renderWithHeader = (component: () => JSX.Element) => {
	const Component = component;

	return(
		<>
			<Header />
			<Component />
		</>
	);
}

const App = () => {
	return (
		<Provider store={store}>
			<Auth>
				<BrowserRouter>
					<Switch>
						<PrivateRoute exact path={["/", "/login"]} component={Login} />
						<PrivateRoute exact path="/registration" component={Registration} />
						<Route path="/not-authenticated/:page" render={(route) => <NotAvailable status={401} page={route.match.params.page} />} />
						<Route path="/not-authorized/:page" render={(route) => <NotAvailable status={403} page={route.match.params.page} />}  />
						<PrivateRoute exact path="/projects" component={() => renderWithHeader(Projects)} />
						<PrivateRoute exact path="/projects/:id" component={() => renderWithHeader(SectionList)} />
						<PrivateRoute exact path="/users" component={() => renderWithHeader(Users)} />
						<PrivateRoute exact path="/create-user" component={() => renderWithHeader(Registration)} />
						<Route path="/users/:id" />
						<Route path="*" render={() => <NotAvailable status={404} />} />
					</Switch>
				</BrowserRouter>
			</Auth>
		</Provider>
	);
};

export default App;
