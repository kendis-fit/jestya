import React from "react";
import { useVanillaFetch } from "vanilla-hooks";
import { Redirect, useRouteMatch, Route } from "react-router-dom";

import resource from "../../api/resource";
import Registration from "../Registration";
import Login from "../Login";

const NoUnauthenticatedRoute = () => {
	const { url } = useRouteMatch();
	const { data: superAdminExisted, loading, error } = useVanillaFetch(() => resource.users.findByRole("SUPER_ADMIN"));

	if (error) {
		return <Redirect to={`/not-available${url}`} />
	}

	if (loading) {
		return <div>loading...</div>
	}

	if (superAdminExisted) {
		return <Route path={["/", "/login"]} component={Login} />	
	} else if (url === "/registration") {
		return <Registration />
	}
	return <Redirect to="/registration" />
};

export default NoUnauthenticatedRoute;
