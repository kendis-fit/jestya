import { Controller, Post, Body, Delete, Param, UseGuards, Get, Patch, ParseUUIDPipe, HttpCode } from "@nestjs/common";
import {
	ApiTags,
	ApiBearerAuth,
	ApiOkResponse,
	ApiForbiddenResponse,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiBadRequestResponse,
} from "@nestjs/swagger";

import { Role } from "../../user/user.entity";
import { ProjectService } from "../project.service";
import { JwtGuard } from "../../guards/jwt/jwt.guard";
import { ProjectInfo } from "../dto/project-info.dto";
import { User } from "../../decorators/user.decorator";
import { RoleGuard } from "../../guards/role/role.guard";
import { BoardInfo } from "../../board/dto/board-info.dto";
import { ProjectCreated } from "../dto/project-created.dto";
import { ProjectCreating } from "../dto/project-creating.dto";
import { ProjectUsersInfo } from "../dto/project-users-info.dto";
import { ProjectUpdateState } from "../dto/project-update-state.dto";
import { Error, ErrorBadRequest } from "../../helpers/error.interfaces";
import { JwtProjectsGuard } from "../../guards/jwt-projects/jwt-projects.guard";
import { RoleProjectsGuard } from "../../guards/role-projects/role-projects.guard";

@ApiBearerAuth()
@ApiTags("projects")
@Controller("projects")
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@ApiOkResponse({ type: [ProjectInfo] })
	@ApiForbiddenResponse({ type: Error })
	@Get()
	@UseGuards(JwtGuard)
	public async findAll(@User("id") userId: string): Promise<ProjectInfo[]> {
		const [projects] = await this.projectService.findAll(userId, [{ relation: "boards", subrelations: ["tasks"] }]);
		return projects.map(project => new ProjectInfo(project));
	}

	@ApiOkResponse({ type: [BoardInfo] })
	@ApiForbiddenResponse({ type: Error })
	@Get(":id/boards")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]))
	public async findAllBoards(@Param("id", ParseUUIDPipe) projectId: string): Promise<BoardInfo[]> {
		const boards = await this.projectService.findAllBoards(projectId);
		return boards.map(board => new BoardInfo(board));
	}

	@ApiOkResponse({ type: [ProjectUsersInfo] })
	@ApiForbiddenResponse({ type: Error })
	@Get(":id/users")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]))
	public async findAllUsers(@Param("id", ParseUUIDPipe) projectId: string): Promise<ProjectUsersInfo[]> {
		const users = await this.projectService.findAllUsers(projectId);
		return users.map(user => new ProjectUsersInfo(user));
	}

	@ApiCreatedResponse({ type: ProjectCreated })
	@ApiBadRequestResponse({ type: ErrorBadRequest })
	@ApiForbiddenResponse({ type: Error })
	@Post()
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async create(@Body() project: ProjectCreating, @User("id") userId: string): Promise<ProjectCreated> {
		const newProject = await this.projectService.create(userId, project);
		return new ProjectCreated(newProject);
	}

	@ApiNoContentResponse()
	@ApiNotFoundResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@HttpCode(204)
	@Post(":id/users/:userId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async addUser(
		@Param("id", ParseUUIDPipe) projectId: string,
		@Param("userId", ParseUUIDPipe) userId: string
	): Promise<void> {
		await this.projectService.addUser(projectId, userId);
	}

	@ApiNoContentResponse()
	@ApiBadRequestResponse({ type: ErrorBadRequest })
	@ApiNotFoundResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@HttpCode(204)
	@Patch(":id")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async updateState(
		@Param("id", ParseUUIDPipe) projectId: string,
		@Body() project: ProjectUpdateState
	): Promise<void> {
		await this.projectService.updateState(projectId, project);
	}

	@ApiNoContentResponse()
	@ApiNotFoundResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@HttpCode(204)
	@Delete(":id/users/:userId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.ADMIN]), new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async removeUser(
		@Param("id", ParseUUIDPipe) projectId: string,
		@Param("userId", ParseUUIDPipe) userId: string
	): Promise<void> {
		await this.projectService.removeUser(projectId, userId);
	}
}
