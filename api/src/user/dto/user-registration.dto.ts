import { ApiProperty } from "@nestjs/swagger";

export class UserRegistration {
	@ApiProperty()
	public name: string;

	@ApiProperty()
	public login: string;

	@ApiProperty()
	public password: string;
}
