import { ApiProperty } from "@nestjs/swagger";

import { User } from "../user.entity";

export class UserRegistration {
	@ApiProperty()
	public name: string;

	@ApiProperty()
	public login: string;

	@ApiProperty()
	public password: string;

	constructor(user: User) {
		this.name = user.name;
		this.login = user.login;
		this.password = user.password;
	}
}
