import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, Put, UseGuards, Delete, Param, ParseUUIDPipe, Body, Post } from "@nestjs/common";

import { Role } from "../../user/user.entity";
import { RoleGuard } from "../../guards/role.guard";
import { BoardService } from "../../board/board.service";
import { BoardUpdate } from "../../board/dto/board-update.dto";
import { BoardCreated } from "../../board/dto/board-created.dto";
import { JwtProjectsGuard } from "../../guards/jwt-projects.guard";
import { BoardCreating } from "../../board/dto/board-creating.dto";
import { RoleProjectsGuard } from "../../guards/role-projects.guard";

@ApiBearerAuth()
@ApiTags("projects")
@Controller("projects")
export class ProjectBoardController {
	constructor(private readonly boardService: BoardService) {}
	
	@Post(":id/boards")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async addBoard(@Param("id", ParseUUIDPipe) projectId: string, @Body() board: BoardCreating): Promise<BoardCreated> {
		const newBoard = await this.boardService.create(board, projectId);
		return new BoardCreated(newBoard.id);
	}

    @Put(":id/boards/:boardId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async updateBoard(@Param("boardId", ParseUUIDPipe) boardId: string, @Body() board: BoardUpdate): Promise<void> {
		await this.boardService.update(boardId, board);
	}

	@Delete(":id/boards/:boardId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async removeBoard(@Param("boardId", ParseUUIDPipe) boardId: string): Promise<void> {
		await this.boardService.remove(boardId);
	}
}