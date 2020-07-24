import { createContext, useContext } from "react";

import { Role } from "../api/users";

export class User {
	constructor(public id: string, public role: Role) {}
}

export class Auth {
	constructor(public isAuthenticated: boolean, public user?: User) {}
}

const existedUser = localStorage["user"];
const user = existedUser ? (JSON.parse(existedUser) as User) : undefined;

const authContext = createContext(new Auth(!!existedUser, user));

export const AuthProvider = authContext.Provider;

export const useAuth = () => {
	return useContext(authContext);
};
