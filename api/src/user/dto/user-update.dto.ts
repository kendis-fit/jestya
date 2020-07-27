import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class UserUpdate {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public login: string;

	@ApiProperty()
	@IsBoolean()
	public isActive: boolean;
}
