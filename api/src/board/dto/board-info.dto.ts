import { Board } from "../board.entity";
import { TaskInfo } from "src/task/dto/task-info.dto";

export class BoardInfo {
	public id: string;
	public name: string;
	public description!: string;
	public tasks: TaskInfo[];

	constructor(board: Board) {
		this.id = board.id;
		this.name = board.name;
		this.description = board.description;
		this.tasks = board.tasks.map(task => new TaskInfo(task));
	}
}
