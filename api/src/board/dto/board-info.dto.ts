import { Board } from "../board.entity";
import { BoardTaskInfo } from "./board-task-info.dto";

export class BoardInfo {
	public id: string;
	public name: string;
	public description!: string;
	public tasks: BoardTaskInfo[];

	constructor(board: Board) {
		this.id = board.id;
		this.name = board.name;
		this.description = board.description;
		this.tasks = board.tasks.map(task => new BoardTaskInfo(task));
	}
}
