import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ComponentCreating {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public name: string;
}
