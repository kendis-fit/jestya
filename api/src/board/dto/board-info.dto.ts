import { Board } from "../board.entity";
import { BoardTaskInfo } from "./board-task-info.dto";
import { ApiProperty } from "@nestjs/swagger";

export class BoardInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public description: string;

	@ApiProperty({ type: [BoardTaskInfo] })
	public tasks: BoardTaskInfo[];

	constructor(board: Board) {
		this.id = board.id;
		this.name = board.name;
		this.description = board.description;
		this.tasks = board.tasks.map(task => new BoardTaskInfo(task));
	}
}
