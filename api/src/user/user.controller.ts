import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, Post, Body, UsePipes, UseGuards, Delete, Put, Param, Patch, Get, Query, ParseIntPipe, ParseUUIDPipe } from "@nestjs/common";

import { Role } from "./user.entity";
import { UserService } from "./user.service";
import { UserInfo } from "./dto/user-info.dto";
import { UserLogin } from "./dto/user-login.dto";
import { RoleGuard } from "../guards/role.guard";
import { UserUpdate } from "./dto/user-update.dto";
import { UserCreated } from "./dto/user-created.dto";
import { UserResponse } from "./dto/user-response.dto";
import { UserCreating } from "./dto/user-creating.dto";
import { UserSelfGuard } from "../guards/user-self.guard";
import { UserRegistration } from "./dto/user-registration.dto";
import { UserUpdatePassword } from "./dto/user-update-password.dto";
import { PasswordEncryptionPipe } from "../pipes/password-encryption.pipe";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(":id")
	public async findById(@Param("id") userId: string): Promise<UserInfo> {
		const foundUser = await this.userService.findById(userId);
		return new UserInfo(foundUser);
	}

	@Get()
	public async find(@Query("offset", ParseIntPipe) offset: number, @Query("size", ParseIntPipe) size: number): Promise<UserInfo[]> {
		const foundUsers = await this.userService.findAll(offset, size);
		return foundUsers.map(user => new UserInfo(user));
	}

	@Post()
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async create(@Body() user: UserCreating): Promise<UserCreated> {
		const id = await this.userService.create(user);
		return new UserCreated(id);
	}

	@Delete(":id")
	@UseGuards(new RoleGuard([Role.SUPER_ADMIN]))
	public async delete(@Param("id", ParseUUIDPipe) userId: string): Promise<void> {
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
