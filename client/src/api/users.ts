import { fetcher } from "./fetcher";

export type Role = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface IUser {
	name: string;
	login: string;
	password: string;
	role: Role;
}

export interface INewUser {
	id: string;
}

const users = {
	find: (id: string) => {},
	findByRole: (role: Role) => {
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/users/${role}`, {
					method: "HEAD",
				});
				if (req.status === 200) {
					resolve(true);
				} else if (req.status === 404) {
					resolve(false);
				} else {
					const error = await req.json();
					reject(error);
				}
			} catch {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
	create: (user: IUser) => {
		return new Promise<INewUser>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/users`, {
					method: "POST",
					body: JSON.stringify(user),
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
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
};

export default users;
