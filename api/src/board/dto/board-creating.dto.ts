import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { Board } from "../board.entity";

export class BoardCreating {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public name: string;

	@ApiProperty()
	@IsString()
	public description: string;

	constructor(board: Board) {
		this.name = board.name;
		this.description = board.description;
	}
}
