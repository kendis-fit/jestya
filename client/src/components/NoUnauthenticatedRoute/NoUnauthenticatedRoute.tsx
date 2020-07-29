import React from "react";
import { useVanillaFetch } from "vanilla-hooks";
import { Redirect, useRouteMatch } from "react-router-dom";

import resource from "../../api/resource";
import Registration from "../Registration";

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
		return <Redirect to="/login" />
	} else if (url === "/registration") {
		return <Registration />
	}
	return <Redirect to="/registration" />
};

export default NoUnauthenticatedRoute;
