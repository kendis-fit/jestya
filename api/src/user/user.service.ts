import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { UserLogin } from "./dto/user-login.dto";
import { AuthService } from "src/auth/auth.service";
import { UserRegistration } from "./dto/user-registration.dto";
import { UserCreated } from "./dto/user-created.dto";
import { UserUpdate } from "./dto/user-update.dto";
import { UserUpdatePassword } from "./dto/user-update-password.dto";

@Injectable()
export class UserService {
	constructor(private readonly auth: AuthService) {}

	public async findById(userId: string) {}

	public async find(offset: number, size: number) {
		if (size > 100) {
			throw new HttpException({ message: "Users must be less than 100" }, HttpStatus.BAD_REQUEST);
		}
	}

	public async login(user: UserLogin) {}

	public async registration(user: UserRegistration) {}

	public async create(user: UserCreated) {}

	public async delete(userId: string) {}

	public async update(userId: string, user: UserUpdate) {}

	public async updatePassword(userId: string, user: UserUpdatePassword) {}
}
