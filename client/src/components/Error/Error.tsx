import React from "react";
import { Redirect } from "react-router-dom";

interface IError {
    error: Error;
}

const Error = (props: IError) => {
    const status = (props.error as any).statusCode;
    if (status === 401) {
        return <Redirect to="/not-authenticated/projects" />
    } else if (status === 403) {
        return <Redirect to="/not-authorized/projects" />
    }
    return <Redirect to={`/not-available/projects`} />
}

export default Error;
