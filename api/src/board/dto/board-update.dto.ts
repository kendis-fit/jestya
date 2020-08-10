import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BoardUpdate {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public name: string;

	@ApiProperty()
	@IsString()
	public description: string;

	@ApiProperty()
	@IsString()
	public color: string;

	@ApiProperty()
	@IsString()
	public icon: string;
}
