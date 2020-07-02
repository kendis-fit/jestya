import { Controller, Post, Body, UsePipes } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserLogin } from "./dto/user-login.dto";
import { PasswordEncryptionPipe } from "src/pipes/password-encryption.pipe";
import { UserResponse } from "./dto/user-response.dto";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("login")
	@UsePipes(new PasswordEncryptionPipe())
	public async login(@Body() user: UserLogin): Promise<UserResponse> {
		return await this.userService.login(user);
	}
}
