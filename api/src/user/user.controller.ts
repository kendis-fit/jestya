import { Controller, Post, Body, UsePipes, UseGuards, Delete, Put, Param, Patch, Get, Query } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserLogin } from "./dto/user-login.dto";
import { RoleGuard } from "src/guards/role.guard";
import { UserUpdate } from "./dto/user-update.dto";
import { UserCreating } from "./dto/user-creating.dto";
import { UserSelfGuard } from "src/guards/user-self.guard";
import { UserRegistration } from "./dto/user-registration.dto";
import { UserUpdatePassword } from "./dto/user-update-password.dto";
import { PasswordEncryptionPipe } from "src/pipes/password-encryption.pipe";
import { Role } from "./user.entity";
import { UserInfo } from "./dto/user-info.dto";
import { UserResponse } from "./dto/user-response.dto";
import { UserCreated } from "./dto/user-created.dto";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(":id")
	public async findById(@Param("id") userId: string): Promise<UserInfo> {
		const foundUser = await this.userService.findById(userId);
		return new UserInfo(foundUser);
	}

	@Get()
	public async find(@Query("offset") offset: number, @Query("size") size: number): Promise<UserInfo[]> {
		const foundUsers = await this.userService.find(offset, size);
		return foundUsers.map(user => new UserInfo(user));
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
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async create(@Body() user: UserCreating): Promise<UserCreated> {
		const id = await this.userService.create(user);
		return new UserCreated(id);
	}

	@Delete(":id")
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN]))
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
