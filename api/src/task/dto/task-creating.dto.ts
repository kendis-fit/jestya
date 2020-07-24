import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, IsEnum, IsArray } from "class-validator";

import { Priority } from "../task.entity";

export class TaskCreating {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Length(6)
	public name: string;

	@ApiProperty()
	@IsString()
	public description: string;

	@ApiProperty({ enum: Priority })
	@IsEnum(Priority)
	public priority: Priority;

	@ApiProperty({ type: [String] })
	@IsArray()
	public componentIds: string[];

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public boardId: string;

	@ApiProperty({ type: [String] })
	@IsArray()
	public executorIds: string[];
}
