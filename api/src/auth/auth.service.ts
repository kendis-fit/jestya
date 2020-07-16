import { sign } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { Injectable, BadRequestException, ForbiddenException } from "@nestjs/common";

import { User, Role } from "../user/user.entity";
import { IJwt } from "../strategies/jwt.interface";
import { UserService } from "../user/user.service";
import { UserLogin } from "../user/dto/user-login.dto";
import { UserCreating } from "../user/dto/user-creating.dto";
import { UserRegistration } from "../user/dto/user-registration.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService
		) {}

	public signPayload(payload: IJwt) {
		const secretKey = this.configService.get<string>("jwt.secretKey");
		return sign(payload, secretKey, { expiresIn: "10h" });
	}

	public async login(user: UserLogin): Promise<string> {
		const foundUser = await this.userService.findByLogin(user.login);
		if (foundUser.password !== user.password) {
			throw new BadRequestException({ message: "Password is wrong" });
		}
		const token = this.signPayload({ id: foundUser.id, role: foundUser.role });
		return token;
	}

	public async registration(user: UserRegistration): Promise<void> {
		const countUsers = await this.userService.count();
		if (countUsers !== 0) {
			throw new ForbiddenException({ message: "Registration isn't available anymore" });
		}
		const newUser = new User();
		newUser.name = user.name;
		newUser.login = user.login;
		newUser.password = user.password;
		newUser.role = Role.SUPER_ADMIN;
		await this.userService.create(new UserCreating(newUser));
	}
}
