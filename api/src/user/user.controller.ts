import { Controller, Post, Body, UsePipes, UseGuards, Delete, Put, Param, Patch } from "@nestjs/common";

import { ROLE } from "./user.entity";
import { UserService } from "./user.service";
import { UserLogin } from "./dto/user-login.dto";
import { UserUpdate } from "./dto/user-update.dto";
import { UserResponse } from "./dto/user-response.dto";
import { RoleGuard } from "src/guards/role.guard";
import { UserCreated } from "./dto/user-created.dto";
import { UserSelfGuard } from "src/guards/user-self.guard";
import { UserRegistration } from "./dto/user-registration.dto";
import { UserUpdatePassword } from "./dto/user-update-password.dto";
import { PasswordEncryptionPipe } from "src/pipes/password-encryption.pipe";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

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
