import { Controller, Post, Body, UsePipes, UseGuards, Delete, Put, Param, Patch, Get, Query } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserLogin } from "./dto/user-login.dto";
import { RoleGuard } from "src/guards/role.guard";
import { UserUpdate } from "./dto/user-update.dto";
import { UserCreated } from "./dto/user-created.dto";
import { UserSelfGuard } from "src/guards/user-self.guard";
import { UserRegistration } from "./dto/user-registration.dto";
import { UserUpdatePassword } from "./dto/user-update-password.dto";
import { PasswordEncryptionPipe } from "src/pipes/password-encryption.pipe";
import { Role } from "./user.entity";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(":id")
	public async findById(@Param("id") userId: string) {}

	@Get()
	public async find(@Query("offset") offset: number, @Query("size") size: number) {}

	@Post("login")
	@UsePipes(new PasswordEncryptionPipe())
	public async login(@Body() user: UserLogin) {}

	@Post("registration")
	@UsePipes(new PasswordEncryptionPipe())
	public async registration(@Body() user: UserRegistration) {}

	@Post()
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async create(@Body() user: UserCreated) {}

	@Delete(":id")
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN]))
	public async delete(@Param("id") userId: string) {}

	@Put(":id")
	@UseGuards(new UserSelfGuard(false))
	public async update(@Param("id") userId: string, @Body() user: UserUpdate) {}

	@Patch(":id")
	@UseGuards(new UserSelfGuard(false))
	public async updatePassword(@Param("id") userId: string, user: UserUpdatePassword) {}
}
