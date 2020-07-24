import { ApiProperty } from "@nestjs/swagger";

import { User } from "../user.entity";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class UserRegistration {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Length(6)
	public login: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Length(9)
	public password: string;

	constructor(user: User) {
		this.name = user.name;
		this.login = user.login;
		this.password = user.password;
	}
}
