import { Controller, Post, Body, Delete, Param, UseGuards, Get, Req, Query } from "@nestjs/common";

import { ROLE } from "src/user/user.entity";
import { RoleGuard } from "src/guards/role.guard";

@Controller("project")
export class ProjectController {
	@Delete(":id")
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async delete(@Param("id") projectId: string) {}

	@Get(":id/boards")
	public async findAllBoards(@Param("id") projectId: string) {}

	@Get(":id/users")
	public async findAllUsers(@Param("id") projectId: string) {}

	@Get()
	public async findAll(@Query("offset") offset: number, @Query("size") size: number, @Req() req) {}

	@Post(":id/users")
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async addUser(@Param("id") projectId: string) {}

	@Delete(":id/users/:userId")
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async removeUser(@Param("id") projectId: string, @Param("userId") userId: string) {}

	@Post(":id/boards")
	@UseGuards(new RoleGuard([ROLE.Admin]))
	public async addBoard(@Param("id") projectId: string) {}

	@Delete(":id/boards/:boardId")
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async removeBoard(@Param("id") projectId: string, @Param("boardId") boardId: string) {}
}
