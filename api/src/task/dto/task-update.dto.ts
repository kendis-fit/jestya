import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum } from "class-validator";

import { Priority } from "../task.entity";

export class TaskUpdate {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public name: string;

	@ApiProperty()
	@IsString()
	public description: string;

	@ApiProperty({ enum: Priority })
	@IsEnum(Priority)
	public priority: Priority;
}
