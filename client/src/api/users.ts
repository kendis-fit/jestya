export type Role = "SUPER_ADMIN" | "ADMIN" | "USER";

const users = {
	find: (id: string) => {},
	findByRole: (role: Role) => {},
};

export default users;
