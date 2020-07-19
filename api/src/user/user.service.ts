import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { User } from "./user.entity";
import { UserUpdate } from "./dto/user-update.dto";
import { UserCreating } from "./dto/user-creating.dto";
import { UserUpdatePassword } from "./dto/user-update-password.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	public async count(): Promise<number> {
		return await this.usersRepository.count();
	}

	public async findById(userId: string, relations?: string[]): Promise<User> {
		const user = await this.usersRepository.findOne(userId, { relations });
		if (!user) {
			throw new HttpException({ message: "User wasn't found" }, HttpStatus.NOT_FOUND);
		}
		return user;
	}

	public async findByIds(userIds: string[], relations?: string[]): Promise<User[]> {
		const users = await this.usersRepository.findByIds(userIds, { relations });
		return users;
	}

	public async findByLogin(userLogin: string, relations?: string[]): Promise<User> {
		const user = await this.usersRepository.findOne({ login: userLogin }, { relations });
		if (!user) {
			throw new HttpException({ message: "User wasn't found" }, HttpStatus.NOT_FOUND);
		}
		return user;
	}

	public async findAll(offset: number, size: number, relations?: string[]): Promise<User[]> {
		if (size > 100) {
			throw new HttpException({ message: "Users must be less than 100" }, HttpStatus.BAD_REQUEST);
		}
		const users = await this.usersRepository.find({ skip: offset, take: size, relations });
		return users;
	}

	public async create(user: UserCreating): Promise<string> {
		const foundUser = await this.usersRepository.findOne({ login: user.login });
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
		await this.usersRepository.save(foundUser);
	}

	public async updatePassword(userId: string, user: UserUpdatePassword): Promise<void> {
		const foundUser = await this.findById(userId);
		if (foundUser.password !== user.oldPassword) {
			throw new HttpException({ message: "Passwords aren't equal" }, HttpStatus.BAD_REQUEST);
		}
		foundUser.password = user.newPassword;
		await this.usersRepository.save(foundUser);
	}
}
