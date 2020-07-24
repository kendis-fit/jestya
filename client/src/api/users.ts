import { fetcher } from "./fetcher";

export type Role = "SUPER_ADMIN" | "ADMIN" | "USER";

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
				reject({ message: "Unknown error" });
			}
		});
	},
};

export default users;
