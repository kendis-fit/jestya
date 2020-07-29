import React, { useEffect } from "react";

import { useAuth } from "../../context/auth";

export interface INotAvailable {
    page?: string;
}

const NotAvailable = (props: INotAvailable) => {
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        setIsAuthenticated?.(false);
    }, [setIsAuthenticated]);

    return (
        <div>Page {props.page ? props.page + " " : null}isn't available</div>
    );
}

export default NotAvailable;