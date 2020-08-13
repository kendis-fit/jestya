import React, { Component, ReactNode } from "react";
import Error from "../Error/Error";

export interface IErrorBoundaryProps {
    children?: ReactNode;
}

export interface IErrorBoundaryState {
    error: Error | null;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = {
            error: null
        }
    }

    static getDerivedStateFromError(error: Error) {
        return {
            error
        }
    }

    render() {
        if (this.state.error) {
            return <Error error={this.state.error} />
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
