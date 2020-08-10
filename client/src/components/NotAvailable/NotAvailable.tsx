import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/auth";

export interface INotAvailable {
	page?: string;
	status?: string | number;
}

const NotAvailable = (props: INotAvailable) => {
	const { setIsAuthenticated } = useAuth();

	useEffect(() => {
		if (props.status === 401 || props.status === 500) {
			setIsAuthenticated?.(false);
		}
	}, [props.status, setIsAuthenticated]);

	return (
		<div className="not-available">
			<div>
				<h1>Error {props.status} has occured</h1>
			</div>
			<div>
				<h2>The page {props.page ? props.page + " " : null}isn't available</h2>
			</div>
			<Link to={props.status === 404 ? "/login" : "/projects"} className="btn btn-secondary d-flex">
				<span>Exit to main page</span>
				<span className="material-icons">exit_to_app</span>
			</Link>
		</div>
	);
};

export default NotAvailable;
