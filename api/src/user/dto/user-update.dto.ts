import { ApiProperty } from "@nestjs/swagger";

export class UserUpdate {
	@ApiProperty()
	public name: string;

	@ApiProperty()
	public login: string;
}
