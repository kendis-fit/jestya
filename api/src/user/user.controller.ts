import { Controller, Post, Body, UsePipes, UseGuards } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserLogin } from "./dto/user-login.dto";
import { UserResponse } from "./dto/user-response.dto";
import { UserRegistration } from "./dto/user-registration.dto";
import { PasswordEncryptionPipe } from "src/pipes/password-encryption.pipe";
import { RoleGuard } from "src/guards/role.guard";
import { ROLE } from "./user.entity";

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
	@UseGuards(new RoleGuard(ROLE.SuperAdmin))
	public async create(@Body() user: UserRegistration): Promise<void> {
		await this.userService.create(user);
	}
}
