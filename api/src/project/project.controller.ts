import { Controller, Post, Body, Delete, Param, UseGuards, Get, Req, Query } from "@nestjs/common";

import { ROLE } from "src/user/user.entity";
import { RoleGuard } from "src/guards/role.guard";
import { ProjectCreated } from "./dto/project-created.dto";
import { ProjectService } from "./project.service";

@Controller("project")
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Get()
	public async findAll(@Query("offset") offset: number, @Query("size") size: number, @Req() req) {}

	@Get(":id/boards")
	public async findAllBoards(@Param("id") projectId: string) {}

	@Get(":id/users")
	public async findAllUsers(@Param("id") projectId: string) {}

	@Post()
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async create(@Body() project: ProjectCreated, @Req() req): Promise<{ id: string }> {
		const newProjectId = await this.projectService.create(project, req.user.id);
		return { id: newProjectId };
	}

	@Post(":id/users/:userId")
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async addUser(@Param("id") projectId: string, @Param("userId") userId: string) {}

	@Post(":id/boards")
	@UseGuards(new RoleGuard([ROLE.Admin]))
	public async addBoard(@Param("id") projectId: string) {}

	@Delete(":id")
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async delete(@Param("id") projectId: string, @Req() req) {
		await this.projectService.delete(projectId, req.user.id);
	}

	@Delete(":id/users/:userId")
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async removeUser(@Param("id") projectId: string, @Param("userId") userId: string) {}

	@Delete(":id/boards/:boardId")
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async removeBoard(@Param("id") projectId: string, @Param("boardId") boardId: string) {}
}
