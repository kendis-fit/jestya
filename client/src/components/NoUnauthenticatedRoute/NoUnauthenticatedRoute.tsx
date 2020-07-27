import React from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { useVanillaFetch } from "vanilla-hooks";

import resource from "../../api/resource";
import Registration from "../Registration";

const NoUnauthenticatedRoute = () => {
	const { path } = useRouteMatch();
	const { data: superAdminExisted, loading, error } = useVanillaFetch(() => resource.users.findByRole("SUPER_ADMIN"));

	if (error) {
		return <div>The page isn't available</div>
	}

	if (loading) {
		return <div>loading...</div>;
	}

	if (superAdminExisted) {
		return <Redirect to="/login" />
	} else if (path === "/registration") {
		return <Registration />
	}
	return <Redirect to="/registration" />
};

export default NoUnauthenticatedRoute;
