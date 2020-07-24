import { createContext, useContext } from "react";

import { Role } from "../api/users";
import { IAuthToken } from "../api/auth";

export class User implements IAuthToken {
	constructor(public id: string, public role: Role, public token: string) {}
}

export class Auth {
	constructor(public isAuthenticated: boolean, public user?: User) {}
}

export interface IAuth {
	auth: Auth;
	setIsAuthenticated?: (isAuthenticated: boolean) => void;
	setUser?: (user: IAuthToken) => void;
}

export const AuthContext = createContext<IAuth>({ auth: new Auth(false) });

export const useAuth = () => {
	return useContext(AuthContext);
};
