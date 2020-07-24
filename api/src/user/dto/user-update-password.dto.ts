import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length } from "class-validator";

export class UserUpdatePassword {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public oldPassword: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Length(9)
	public newPassword: string;
}
