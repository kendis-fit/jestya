import React, { useState, useEffect } from "react";

import EditUser from "../EditUser";
import { Role } from "../../api/users";
import { useAuth } from "../../context/auth";
import ChangePassword from "../ChangePassword";

export interface IUserInfoProps {
    id: string;
    name: string;
    role: Role;
    login: string;
    createdAt: Date;
    isActive: boolean;
}

const UserInfo = (props: IUserInfoProps) => {
    const { auth } = useAuth();
    const [userInfo, setUserInfo] = useState(props);

    useEffect(() => {
        setUserInfo(props);
    }, [props]);

    return(
        <section className="user-info">
            <div className="user-info__details">
                <div className="fs-20">Details</div>
                {
                    auth.user?.id === props.id ? <EditUser onUpdate={(values) => setUserInfo({...userInfo, ...values})} {...userInfo} /> : null
                }
            </div>
            <div className="d-flex">
                <ul className="user-info__column-information user-info__column-information--label">
                    <li style={{ height: "50px" }}>Avatar:</li>
                    <li>Name:</li>
                    <li>Login:</li>
                    <li>Role:</li>
                    <li>Created at:</li>
                    {
                       auth.user?.id === props.id ? <li>Password:</li> : null
                    }
                </ul>
                <ul className="user-info__column-information">
                    <li><div className="user-info__icon">{userInfo.name[0].toUpperCase()}</div></li>
                    <li>{userInfo.name}</li>
                    <li>{userInfo.login}</li>
                    <li>{userInfo.role}</li>
                    <li>{new Date(userInfo.createdAt).toUTCString()}</li>
                    <li>
                        {
                            auth.user?.id === props.id ? <ChangePassword id={props.id} /> : null
                        }
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default UserInfo;