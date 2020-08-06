import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./scss/main.scss";
import Users from "./components/Users";
import Login from "./components/Login";
import reducer from "./reducers/reducer";
import Auth from "./components/Auth/Auth";
import AddUser from "./components/AddUser";
import BoardList from "./components/Boards";
import Registration from "./components/Registration";
import NotAvailable from "./components/NotAvailable";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import ProjectsContainer from "./components/Projects/ProjectsContainer";

const store = createStore(reducer);

const App = () => {
	return (
		<Provider store={store}>
			<Auth>
				<BrowserRouter>
					<Switch>
						<PrivateRoute exact path={["/", "/login"]} component={Login} />
						<PrivateRoute exact path="/registration" component={Registration} />
						<PrivateRoute exact path="/projects" isHeader component={ProjectsContainer} />
						<PrivateRoute exact path="/projects/:projectId" isHeader component={BoardList} />
						<PrivateRoute exact path="/users" isHeader component={Users} />
						<PrivateRoute exact path="/users/:id" isHeader component={Users} />
						<PrivateAdminRoute roles={["ADMIN", "SUPER_ADMIN"]} exact path="/create-user" isHeader component={Registration} />
						<PrivateAdminRoute roles={["ADMIN", "SUPER_ADMIN"]} exact path="/add-user" isHeader component={AddUser} />
						<Route path="/not-authenticated/:page" render={(route) => <NotAvailable status={401} page={route.match.params.page} />} />
						<Route path="/not-authorized/:page" render={(route) => <NotAvailable status={403} page={route.match.params.page} />}  />
						<Route path="/not-available/:page" render={(route) => <NotAvailable status={500} page={route.match.params.page} />}  />
						<Route path="*" render={() => <NotAvailable status={404} />} />
					</Switch>
				</BrowserRouter>
			</Auth>
		</Provider>
	);
};

export default App;
