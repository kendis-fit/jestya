import { Board } from "../board.entity";

export class BoardUpdate {
	public name: string;
	public description!: string;

	constructor(board: Board) {
		this.name = board.name;
		this.description = board.description;
	}
}
