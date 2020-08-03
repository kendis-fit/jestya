import { ApiProperty } from "@nestjs/swagger";
import { Board } from "src/board/board.entity";

export class ProjectBoardInfo {
	@ApiProperty()
	public countTasks: number;

	@ApiProperty()
	public name: string;

	constructor(board: Board) {
		this.name = board.name;
		this.countTasks = board.tasks.length;
	}
}
