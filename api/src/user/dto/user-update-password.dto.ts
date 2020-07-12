import { ApiProperty } from "@nestjs/swagger";

export class UserUpdatePassword {
	@ApiProperty()
	public oldPassword: string;

	@ApiProperty()
	public newPassword: string;
}
