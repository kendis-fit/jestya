import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { User } from "../user.entity";

export class UserLogin {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public login: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public password: string;
}
