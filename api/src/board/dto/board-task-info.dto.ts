import { ApiProperty } from "@nestjs/swagger";

import { Task, Priority } from "../../task/task.entity";

export class BoardTaskInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public description: string;

	@ApiProperty({ enum: Priority })
	public priority: Priority;

	constructor(task: Task) {
		this.id = task.id;
		this.name = task.name;
		this.description = task.description;
		this.priority = task.priority;
	}
}
