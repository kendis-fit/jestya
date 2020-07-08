import { Task } from "../../task/task.entity";

export class BoardTaskInfo {
	public id: string;
	public name: string;
	public description: string;
	public priority: string;

	constructor(task: Task) {
		this.id = task.id;
		this.name = task.name;
		this.description = task.description;
		this.priority = task.priority;
	}
}
