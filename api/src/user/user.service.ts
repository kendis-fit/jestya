import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { User, Role } from "./user.entity";
import { UserLogin } from "./dto/user-login.dto";
import { UserUpdate } from "./dto/user-update.dto";
import { AuthService } from "src/auth/auth.service";
import { UserCreating } from "./dto/user-creating.dto";
import { UserRegistration } from "./dto/user-registration.dto";
import { UserUpdatePassword } from "./dto/user-update-password.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly auth: AuthService
	) {}

	public async findById(userId: string): Promise<User> {
		const user = await this.usersRepository.findOne(userId);
		if (!user) {
			throw new HttpException({ message: "User wasn't found" }, HttpStatus.NOT_FOUND);
		}
		return user;
	}

	public async findByLogin(userLogin: string): Promise<User> {
		const user = await this.usersRepository.findOne({ login: userLogin });
		if (!user) {
			throw new HttpException({ message: "User wasn't found" }, HttpStatus.NOT_FOUND);
		}
		return user;
	}

	public async find(offset: number, size: number): Promise<User[]> {
		if (size > 100) {
			throw new HttpException({ message: "Users must be less than 100" }, HttpStatus.BAD_REQUEST);
		}
		const users = await this.usersRepository.find({ skip: offset, take: size });
		return users;
	}

	public async login(user: UserLogin): Promise<string> {
		const foundUser = await this.findByLogin(user.login);
		if (foundUser.password !== user.password) {
			throw new HttpException({ message: "Password is wrong" }, HttpStatus.BAD_REQUEST);
		}
		const token = this.auth.signPayload({ id: foundUser.id, role: foundUser.role });
		return token;
	}

	public async registration(user: UserRegistration): Promise<void> {
		const countUsers = await this.usersRepository.count();
		if (countUsers !== 0) {
			throw new HttpException({ message: "Registration isn't available anymore" }, HttpStatus.FORBIDDEN);
		}
		const newUser = this.usersRepository.create(user);
		newUser.role = Role.SUPER_ADMIN;
		await this.usersRepository.save(newUser);
	}

	public async create(user: UserCreating): Promise<string> {
		const foundUser = this.usersRepository.findOne({ login: user.login });
		if (foundUser) {
			throw new HttpException({ message: "A user with such a login already exists" }, HttpStatus.CONFLICT);
		}
		const newUser = new User();
		newUser.name = user.name;
		newUser.login = user.login;
		newUser.password = user.password;
		newUser.role = user.role;
		await this.usersRepository.save(newUser);
		return newUser.id;
	}

	public async delete(userId: string): Promise<void> {
		const foundUser = await this.findById(userId);
		await this.usersRepository.remove(foundUser);
	}

	public async update(userId: string, user: UserUpdate): Promise<void> {
		const foundUser = await this.findById(userId);
		foundUser.name = user.name;
		foundUser.login = user.login;
		foundUser.isActive = user.isActive;
		await this.usersRepository.update(userId, foundUser);
	}

	public async updatePassword(userId: string, user: UserUpdatePassword): Promise<void> {
		const foundUser = await this.findById(userId);
		if (foundUser.password !== user.oldPassword) {
			throw new HttpException({ message: "Passwords aren't equal" }, HttpStatus.BAD_REQUEST);
		}
		foundUser.password = user.newPassword;
		await this.usersRepository.update(userId, foundUser);
	}
}
