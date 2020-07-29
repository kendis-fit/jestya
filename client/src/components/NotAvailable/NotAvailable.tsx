import React from "react";

export interface INotAvailable {
    page?: string;
}

const NotAvailable = (props: INotAvailable) => {
    return (
        <div>Page {props.page ? props.page + " " : null}isn't available</div>
    );
}

export default NotAvailable;