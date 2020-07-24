import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

import { Task } from "../task.entity";

export class TaskUpdateActual {
	@ApiProperty()
	@IsBoolean()
	public isActual: boolean;

	constructor(task: Task) {
		this.isActual = task.isActual;
	}
}
