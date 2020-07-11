import { ApiTags } from "@nestjs/swagger";
import { Controller, Put, Delete, Param, Body } from "@nestjs/common";

import { BoardService } from "./board.service";
import { BoardUpdate } from "./dto/board-update.dto";

@ApiTags("boards")
@Controller("boards")
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Put(":id")
	public async update(@Param("id") boardId: string, @Body() board: BoardUpdate): Promise<void> {
		await this.boardService.update(boardId, board);
	}

	@Delete(":id")
	public async remove(@Param("id") boardId: string): Promise<void> {
		await this.boardService.remove(boardId);
	}
}
