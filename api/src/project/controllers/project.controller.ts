import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, Post, Body, Delete, Param, UseGuards, Get, Patch, ParseUUIDPipe } from "@nestjs/common";

import { Role } from "../../user/user.entity";
import { JwtGuard } from "../../guards/jwt.guard";
import { RoleGuard } from "../../guards/role.guard";
import { ProjectService } from "../project.service";
import { ProjectInfo } from "../dto/project-info.dto";
import { User } from "../../decorators/user.decorator";
import { BoardInfo } from "../../board/dto/board-info.dto";
import { ProjectCreated } from "../dto/project-created.dto";
import { ProjectCreating } from "../dto/project-creating.dto";
import { ProjectUsersInfo } from "../dto/project-users-info.dto";
import { JwtProjectsGuard } from "../../guards/jwt-projects.guard";
import { RoleProjectsGuard } from "../../guards/role-projects.guard";
import { ProjectUpdateState } from "../dto/project-update-state.dto";

@ApiBearerAuth()
@ApiTags("projects")
@Controller("projects")
export class ProjectController {
	constructor(
		private readonly projectService: ProjectService,
	) {}

	@Get()
	@UseGuards(JwtGuard)
	public async findAll(@User("id") userId: string): Promise<ProjectInfo[]> {
		const [projects] = await this.projectService.findAll(userId);
		return projects.map(project => new ProjectInfo(project));
	}

	@Get(":id/boards")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]))
	public async findAllBoards(@Param("id", ParseUUIDPipe) projectId: string): Promise<BoardInfo[]> {
		const boards = await this.projectService.findAllBoards(projectId);
		return boards.map(board => new BoardInfo(board));
	}

	@Get(":id/users")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]))
	public async findAllUsers(@Param("id", ParseUUIDPipe) projectId: string): Promise<ProjectUsersInfo[]> {
		const users = await this.projectService.findAllUsers(projectId);
		return users.map(user => new ProjectUsersInfo(user));
	}

	@Post()
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async create(@Body() project: ProjectCreating, @User("id") userId: string): Promise<ProjectCreated> {
		const newProject = await this.projectService.create(userId, project);
		return new ProjectCreated(newProject.id);
	}

	@Post(":id/users/:userId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async addUser(@Param("id", ParseUUIDPipe) projectId: string, @Param("userId", ParseUUIDPipe) userId: string): Promise<void> {
		await this.addUser(projectId, userId);
	}

	@Patch(":id")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async updateState(@Param("id", ParseUUIDPipe) projectId: string, @Body() project: ProjectUpdateState): Promise<void> {
		await this.projectService.updateState(projectId, project);
	}

	@Delete(":id/users/:userId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async removeUser(@Param("id", ParseUUIDPipe) projectId: string, @Param("userId", ParseUUIDPipe) userId: string): Promise<void> {
		await this.projectService.removeUser(projectId, userId);
	}
}
