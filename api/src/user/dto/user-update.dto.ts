import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserUpdate {
	@ApiProperty()
	@IsString()
	public name: string;

	@ApiProperty()
	public login: string;

	@ApiProperty()
	public isActive: boolean;
}
