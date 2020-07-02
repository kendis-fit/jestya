import { Controller, Post, Body, UsePipes } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserLogin } from "./dto/user-login.dto";
import { PasswordEncryptionPipe } from "src/pipes/password-encryption.pipe";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UsePipes(new PasswordEncryptionPipe())
	public login(@Body() user: UserLogin) {}
}
