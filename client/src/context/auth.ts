import { createContext, useContext } from "react";

import { Role } from "../api/users";

export class User {
	constructor(public id: string, public role: Role, public token: string) {}
}

export class Auth {
	constructor(public isAuthenticated: boolean, public user?: User) {}
}

export interface IAuth {
	auth: Auth;
	setIsAuthenticated?: (isAuthenticated: boolean) => void;
	setUser?: (user: User) => void;
}

export const AuthContext = createContext<IAuth>({ auth: new Auth(false) });

export const useAuth = () => {
	return useContext(AuthContext);
};
