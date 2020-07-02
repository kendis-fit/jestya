import { Model } from "mongoose";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { ROLE } from "./user.entity";
import { IUser } from "./user.interface";
import { USER_MODEL } from "./user.providers";
import { UserLogin } from "./dto/user-login.dto";
import { AuthService } from "src/auth/auth.service";
import { UserRegistration } from "./dto/user-registration.dto";

@Injectable()
export class UserService {
	constructor(@Inject(USER_MODEL) private readonly users: Model<IUser>, private readonly auth: AuthService) {}

	public async login(user: UserLogin): Promise<string> {
		const foundUser = await this.users.findOne({ login: user.login }).lean().exec();
		if (!foundUser) {
			throw new HttpException({ message: "User is not found" }, HttpStatus.NOT_FOUND);
		}
		const isPassword = foundUser.password === user.password;
		if (!isPassword) {
			throw new HttpException({}, HttpStatus.BAD_REQUEST);
		}
		const token = this.auth.signPayload({ id: foundUser._id, role: foundUser.role });
		return token;
	}

	public async registration(user: UserRegistration): Promise<string> {
		const superAdminExists = await this.users.exists({ role: ROLE.SuperAdmin });
		if (superAdminExists) {
			throw new HttpException(
				{ message: "If super admin exists, then nobody can sign up" },
				HttpStatus.FORBIDDEN
			);
		}
		const newUser = new this.users(user);
		await newUser.save();
		return newUser._id;
	}

	public async create(user: UserRegistration): Promise<string> {
		const existsUser = await this.users.exists({ login: user.login });
		if (existsUser) {
			throw new HttpException({ message: `User ${user.login} is already exists` }, HttpStatus.CONFLICT);
		}
		const newUser = new this.users(user);
		await newUser.save();
		return newUser._id;
	}
}
