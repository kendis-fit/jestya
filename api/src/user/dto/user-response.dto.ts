import { ApiProperty } from "@nestjs/swagger";

import { Role, User } from "../user.entity";

export class UserResponse {
	@ApiProperty()
	public id: string;

	@ApiProperty({ type: Role })
	public role: Role;

	@ApiProperty()
	public token: string;

	constructor(user: User, token: string) {
		this.id = user.id;
		this.role = user.role;
		this.token = token;
	}
}
