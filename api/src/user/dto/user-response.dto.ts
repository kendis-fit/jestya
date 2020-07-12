import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
	@ApiProperty()
	public token: string;

	constructor(token: string) {
		this.token = token;
	}
}
