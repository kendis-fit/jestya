import { ApiProperty } from "@nestjs/swagger";

import { Task, Priority } from "../task.entity";
import { TaskCreatorInfo } from "./task-creator-info.dto";

export class TaskInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public description: string;

	@ApiProperty({ enum: Priority })
	public priority: Priority;

	@ApiProperty()
	public isActual: boolean;

	@ApiProperty({ type: Date })
	public createdAt: Date;

	@ApiProperty({ type: Date })
	public updateAt: Date;

	@ApiProperty()
	public boardName: string;

	@ApiProperty({ type: TaskCreatorInfo })
	public creator: TaskCreatorInfo;

	constructor(task: Task) {
		this.id = task.id;
		this.name = task.name;
		this.description = task.description;
		this.priority = task.priority;
		this.isActual = task.isActual;
		this.createdAt = task.createdAt;
		this.updateAt = task.updatedAt;
		this.boardName = task.board.name;
		this.creator = new TaskCreatorInfo(task.creator);
	}
}
