import { Controller, Put, UseGuards, Delete, Param, ParseUUIDPipe, Body, Post, HttpCode } from "@nestjs/common";
import {
	ApiTags,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiForbiddenResponse,
	ApiNoContentResponse,
	ApiBadRequestResponse,
} from "@nestjs/swagger";

import { Role } from "../../user/user.entity";
import { Error, ErrorBadRequest } from "../../helpers/error.interfaces";
import { RoleGuard } from "../../guards/role/role.guard";
import { BoardService } from "../../board/board.service";
import { BoardUpdate } from "../../board/dto/board-update.dto";
import { BoardCreated } from "../../board/dto/board-created.dto";
import { BoardCreating } from "../../board/dto/board-creating.dto";
import { JwtProjectsGuard } from "../../guards/jwt-projects/jwt-projects.guard";
import { RoleProjectsGuard } from "../../guards/role-projects/role-projects.guard";

@ApiBearerAuth()
@ApiTags("projects")
@Controller("projects")
export class ProjectBoardController {
	constructor(private readonly boardService: BoardService) {}

	@ApiCreatedResponse({ type: BoardCreated })
	@ApiBadRequestResponse({ type: ErrorBadRequest })
	@ApiNotFoundResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@Post(":id/boards")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async addBoard(
		@Param("id", ParseUUIDPipe) projectId: string,
		@Body() board: BoardCreating
	): Promise<BoardCreated> {
		const newBoard = await this.boardService.create(board, projectId);
		return new BoardCreated(newBoard.id);
	}

	@ApiNoContentResponse()
	@ApiBadRequestResponse({ type: ErrorBadRequest })
	@ApiNotFoundResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@HttpCode(204)
	@Put(":id/boards/:boardId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async updateBoard(
		@Param("boardId", ParseUUIDPipe) boardId: string,
		@Body() board: BoardUpdate
	): Promise<void> {
		await this.boardService.update(boardId, board);
	}

	@ApiNoContentResponse()
	@ApiNotFoundResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@HttpCode(204)
	@Delete(":id/boards/:boardId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async removeBoard(@Param("boardId", ParseUUIDPipe) boardId: string): Promise<void> {
		await this.boardService.remove(boardId);
	}
}
