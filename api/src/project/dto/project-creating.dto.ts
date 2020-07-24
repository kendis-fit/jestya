import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length } from "class-validator";

export class ProjectCreating {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Length(6)
	public name: string;

	@ApiProperty()
	@IsString()
	public description: string;
}
