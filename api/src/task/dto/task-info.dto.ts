import { Task } from "../task.entity";

export class TaskInfo {
	public id: string;
	public name: string;
	public description: string;
	public priority: string;
	public isActual: boolean;
	public createdAt: Date;
	public updateAt: Date;
	public boardName: string;

	constructor(task: Task) {
		this.id = task.id;
		this.name = task.name;
		this.description = task.description;
		this.priority = task.priority;
		this.isActual = task.isActual;
		this.createdAt = task.createdAt;
		this.updateAt = task.updatedAt;
		this.boardName = task.board.name;
	}
}
