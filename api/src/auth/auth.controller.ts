import { Controller, Post, UsePipes, Body, HttpCode } from "@nestjs/common";
import {
	ApiTags,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNoContentResponse,
	ApiBadRequestResponse,
} from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { Error, ErrorBadRequest } from "../helpers/error.interfaces";
import { UserLogin } from "../user/dto/user-login.dto";
import { UserResponse } from "../user/dto/user-response.dto";
import { UserRegistration } from "../user/dto/user-registration.dto";
import { PasswordEncryptionPipe } from "../pipes/password-encryption/password-encryption.pipe";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiCreatedResponse({ type: UserResponse })
	@ApiBadRequestResponse({ type: ErrorBadRequest })
	@ApiForbiddenResponse({ type: Error })
	@Post("login")
	@UsePipes(new PasswordEncryptionPipe(["password"]))
	public async login(@Body() user: UserLogin): Promise<UserResponse> {
		const [foundUser, token] = await this.authService.login(user);
		return new UserResponse(foundUser, token);
	}

	@ApiNoContentResponse()
	@ApiBadRequestResponse({ type: ErrorBadRequest })
	@ApiForbiddenResponse({ type: Error })
	@HttpCode(204)
	@Post("registration")
	@UsePipes(new PasswordEncryptionPipe(["password"]))
	public async registration(@Body() user: UserRegistration): Promise<void> {
		await this.authService.registration(user);
	}
}
