import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, Delete, Param, UseGuards, Get, Req, Query, Patch } from "@nestjs/common";

import { Role } from "../user/user.entity";
import { RoleGuard } from "../guards/role.guard";
import { ProjectService } from "./project.service";
import { ProjectInfo } from "./dto/project-info.dto";
import { User } from "src/decorators/user.decorator";
import { BoardInfo } from "../board/dto/board-info.dto";
import { ProjectCreated } from "./dto/project-created.dto";
import { ProjectCreating } from "./dto/project-creating.dto";
import { BoardCreated } from "../board/dto/board-created.dto";
import { ProjectUsersInfo } from "./dto/project-users-info.dto";
import { BoardCreating } from "../board/dto/board-creating.dto";
import { ProjectUpdateState } from "./dto/project-update-state.dto";

@ApiTags("projects")
@Controller("projects")
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Get()
	public async findAll(
		@Query("offset") offset: number,
		@Query("size") size: number,
		@User("id") userId: string
	): Promise<ProjectInfo[]> {
		const projects = await this.projectService.findAll(offset, size, userId);
		return projects.map(project => new ProjectInfo(project));
	}

	@Get(":id/boards")
	public async findAllBoards(@Param("id") projectId: string): Promise<BoardInfo[]> {
		const boards = await this.projectService.findAllBoards(projectId);
		return boards.map(board => new BoardInfo(board));
	}

	@Get(":id/users")
	public async findAllUsers(@Param("id") projectId: string): Promise<ProjectUsersInfo[]> {
		const users = await this.projectService.findAllUsers(projectId);
		return users.map(user => new ProjectUsersInfo(user));
	}

	@Post()
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async create(@Body() project: ProjectCreating, @User("id") userId: string): Promise<ProjectCreated> {
		const newProject = await this.projectService.create(userId, project);
		return new ProjectCreated(newProject.id);
	}

	@Post(":id/users/:userId")
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async addUser(@Param("id") projectId: string, @Param("userId") userId: string): Promise<void> {
		await this.addUser(projectId, userId);
	}

	@Post(":id/boards")
	@UseGuards(new RoleGuard([Role.ADMIN]))
	public async addBoard(@Param("id") projectId: string, @Body() board: BoardCreating): Promise<BoardCreated> {
		const newBoard = await this.projectService.addBoard(projectId, board);
		return new BoardCreated(newBoard.id);
	}

	@Patch(":id")
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async updateState(@Param("id") projectId: string, @Body() project: ProjectUpdateState): Promise<void> {
		await this.projectService.updateState(projectId, project);
	}

	@Delete(":id/users/:userId")
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async removeUser(@Param("id") projectId: string, @Param("userId") userId: string): Promise<void> {
		await this.projectService.removeUser(projectId, userId);
	}
}
