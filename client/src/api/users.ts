export type Role = "SUPER_ADMIN" | "ADMIN" | "USER";

const users = {
	find: (id: string) => {},
	findByRole: (role: Role) => {
		return new Promise<boolean>((resolve, reject) => {
			resolve(true);
		});
	},
};

export default users;
