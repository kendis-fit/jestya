import { ApiProperty } from "@nestjs/swagger";

export class UserLogin {
	@ApiProperty()
	public login: string;

	@ApiProperty()
	public password: string;
}
