import { Role } from "src/user/user.entity";

export interface IJwt {
	id: string;
	role: Role;
	iat?: Date;
}
