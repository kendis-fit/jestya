import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class TaskUpdateActual {
	@ApiProperty()
	@IsBoolean()
	public isActual: boolean;
}
