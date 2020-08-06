import { JwtService } from "@nestjs/jwt";
import { Injectable, ForbiddenException } from "@nestjs/common";

import { User, Role } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { UserLogin } from "../user/dto/user-login.dto";
import { UserRegistration } from "../user/dto/user-registration.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	public async login(user: UserLogin): Promise<[User, string]> {
		const foundUser = await this.userService.findByLogin(user.login);
		if (foundUser.password !== user.password) {
			throw new ForbiddenException("Password is wrong");
		}

		const token = this.jwtService.sign({ id: foundUser.id, role: foundUser.role });
		return [foundUser, token];
	}

	public async registration(user: UserRegistration): Promise<User> {
		const countUsers = await this.userService.count();
		if (countUsers !== 0) {
			throw new ForbiddenException({ message: "Registration isn't available anymore" });
		}
		const newUser = new User();
		newUser.name = user.name;
		newUser.login = user.login;
		newUser.password = user.password;
		newUser.role = Role.SUPER_ADMIN;

		await this.userService.create(newUser);
		return newUser;
	}
}
