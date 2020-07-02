import { Controller, Post, Body, UsePipes, UseGuards, Delete, Put, Param, Patch, Get, Query } from "@nestjs/common";

import { ROLE } from "./user.entity";
import { UserService } from "./user.service";
import { UserInfo } from "./dto/user-info.dto";
import { UserLogin } from "./dto/user-login.dto";
import { RoleGuard } from "src/guards/role.guard";
import { UserUpdate } from "./dto/user-update.dto";
import { UserCreated } from "./dto/user-created.dto";
import { UserResponse } from "./dto/user-response.dto";
import { UserSelfGuard } from "src/guards/user-self.guard";
import { UserRegistration } from "./dto/user-registration.dto";
import { UserUpdatePassword } from "./dto/user-update-password.dto";
import { PasswordEncryptionPipe } from "src/pipes/password-encryption.pipe";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(":id")
	public async findById(@Param("id") userId: string): Promise<UserInfo> {
		const user = await this.userService.findById(userId);
		return new UserInfo(user._id, user.name, user.login, user.createdAt);
	}

	@Get()
	public async find(@Query("offset") offset: number, @Query("size") size: number): Promise<UserInfo[]> {
		const users = await this.userService.find(offset, size);
		return users.map(user => new UserInfo(user._id, user.name, user.login, user.createdAt));
	}

	@Post("login")
	@UsePipes(new PasswordEncryptionPipe())
	public async login(@Body() user: UserLogin): Promise<UserResponse> {
		const token = await this.userService.login(user);
		return new UserResponse(token);
	}

	@Post("registration")
	@UsePipes(new PasswordEncryptionPipe())
	public async registration(@Body() user: UserRegistration): Promise<void> {
		await this.userService.registration(user);
	}

	@Post()
	@UseGuards(new RoleGuard([ROLE.SuperAdmin, ROLE.Admin]))
	public async create(@Body() user: UserCreated): Promise<void> {
		await this.userService.create(user);
	}

	@Delete(":id")
	@UseGuards(new RoleGuard([ROLE.SuperAdmin]))
	public async delete(@Param("id") userId: string): Promise<void> {
		await this.userService.delete(userId);
	}

	@Put(":id")
	@UseGuards(new UserSelfGuard(false))
	public async update(@Param("id") userId: string, @Body() user: UserUpdate): Promise<void> {
		await this.userService.update(userId, user);
	}

	@Patch(":id")
	@UseGuards(new UserSelfGuard(false))
	public async updatePassword(@Param("id") userId: string, user: UserUpdatePassword): Promise<void> {
		await this.userService.updatePassword(userId, user);
	}
}
