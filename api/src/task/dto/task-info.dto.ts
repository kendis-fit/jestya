import { Task } from "../task.entity";

export class TaskInfo {
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
