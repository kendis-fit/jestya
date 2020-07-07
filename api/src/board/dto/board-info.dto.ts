import { Board } from "../board.entity";

export class BoardInfo {
	public id: string;
	public name: string;
	public description!: string;
	public tasks: any[];

	constructor(board: Board) {
		this.id = board.id;
		this.name = board.name;
		this.description = board.description;
	}
}
