import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, UsePipes, Body } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserLogin } from "../user/dto/user-login.dto";
import { UserResponse } from "../user/dto/user-response.dto";
import { UserRegistration } from "../user/dto/user-registration.dto";
import { PasswordEncryptionPipe } from "../pipes/password-encryption/password-encryption.pipe";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	@UsePipes(new PasswordEncryptionPipe(["password"]))
	public async login(@Body() user: UserLogin): Promise<UserResponse> {
		const token = await this.authService.login(user);
		return new UserResponse(token);
	}

	@Post("registration")
	@UsePipes(new PasswordEncryptionPipe(["password"]))
	public async registration(@Body() user: UserRegistration): Promise<void> {
		await this.authService.registration(user);
	}
}
