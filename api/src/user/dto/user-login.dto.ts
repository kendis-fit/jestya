import { ApiProperty } from "@nestjs/swagger";

import { User } from "../user.entity";

export class UserLogin {
	@ApiProperty()
	public login: string;

	@ApiProperty()
	public password: string;

	constructor(user: User) {
		this.login = user.login;
		this.password = user.password;
	}
}
