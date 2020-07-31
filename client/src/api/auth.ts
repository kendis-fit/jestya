import { Role } from "./users";
import { fetcher } from "./fetcher";

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
		return new Promise<IAuthToken>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/auth/login`, {
					method: "POST",
					body: JSON.stringify(auth),
					headers: {
						"Content-Type": "application/json",
					},
				});
				const body = await req.json();
				if (req.status === 201) {
					resolve(body);
				} else {
					reject(body);
				}
			} catch {
				reject({ message: "An unknown error", status: 500 });
			}
		});
	},
	registration: (auth: IAuthRegistration) => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/auth/registration`, {
					method: "POST",
					body: JSON.stringify(auth),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (req.status === 204) {
					resolve();
				} else {
					const body = await req.json();
					reject(body);
				}
			} catch {
				reject({ message: "An unknown error", status: 500 });
			}
		});
	},
};

export default auth;
