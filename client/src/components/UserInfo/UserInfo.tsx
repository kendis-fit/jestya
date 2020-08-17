import React from "react";
import { Role } from "../../api/users";

export interface IUserInfoProps {
    name: string;
    role: Role;
    login: string;
    createdAt: Date;
    isActive: boolean;
}

const UserInfo = (props: IUserInfoProps) => {
    return(
        <section className="user-info">
            <div className="user-info__details">
                <div className="fs-20">Details</div>
                <span className="material-icons user-info__editor">edit</span>
            </div>
            <div className="d-flex">
                <ul className="user-info__column-information user-info__column-information--label">
                    <li style={{ height: "50px" }}>Avatar:</li>
                    <li>Name:</li>
                    <li>Role:</li>
                    <li>Created at:</li>
                    <li>Password:</li>
                </ul>
                <ul className="user-info__column-information">
                    <li><div className="user-info__icon">{props.name[0].toUpperCase()}</div></li>
                    <li>{props.name}</li>
                    <li>{props.role}</li>
                    <li>{new Date(props.createdAt).toUTCString()}</li>
                    <li>
                        <button className="btn btn-primary btn-sm">Change Password</button>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default UserInfo;