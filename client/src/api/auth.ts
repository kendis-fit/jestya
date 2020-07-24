import { Role } from "./users";

export interface IAuthLogin {
	login: string;
	password: string;
}

export interface IAuthToken {
	id: string;
	role: Role;
	token: string;
}

export interface IAuthRegistration extends IAuthLogin {
	name: string;
}

const auth = {
	login: (auth: IAuthLogin) => {
		return new Promise<IAuthToken>((resolve, reject) => {
			resolve();
		});
	},
	registration: (auth: IAuthRegistration) => {
		return new Promise<void>((resolve, reject) => {
			resolve();
		});
	},
};

export default auth;
