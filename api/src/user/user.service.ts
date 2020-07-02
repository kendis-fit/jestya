import { Model } from "mongoose";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { ROLE } from "./user.entity";
import { IUser } from "./user.interface";
import { USER_MODEL } from "./user.providers";
import { UserLogin } from "./dto/user-login.dto";
import { AuthService } from "src/auth/auth.service";
import { UserRegistration } from "./dto/user-registration.dto";
import { UserCreated } from "./dto/user-created.dto";
import { UserUpdate } from "./dto/user-update.dto";

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

	public async create(user: UserCreated): Promise<string> {
		const existsUser = await this.users.exists({ login: user.login });
		if (existsUser) {
			throw new HttpException({ message: `User ${user.login} is already exists` }, HttpStatus.CONFLICT);
		}
		const newUser = new this.users(user);
		await newUser.save();
		return newUser._id;
	}

	public async delete(userId: string): Promise<void> {
		await this.users.deleteOne({ _id: userId });
	}

	public async update(userId: string, user: UserUpdate): Promise<void> {
		const foundUser = await this.users.findById(userId).exec();
		if (!foundUser) {
			throw new HttpException({ message: "User is not found" }, HttpStatus.NOT_FOUND);
		}
		foundUser.name = user.name;
		foundUser.login = user.login;
		await foundUser.save();
	}
}
