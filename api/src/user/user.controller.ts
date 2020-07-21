import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import {
	Controller,
	Post,
	Body,
	UseGuards,
	Delete,
	Put,
	Param,
	Patch,
	Get,
	Query,
	ParseIntPipe,
	ParseUUIDPipe,
	UsePipes,
} from "@nestjs/common";

import { Role } from "./user.entity";
import { UserService } from "./user.service";
import { UserInfo } from "./dto/user-info.dto";
import { JwtGuard } from "../guards/jwt/jwt.guard";
import { RoleGuard } from "../guards/role/role.guard";
import { UserUpdate } from "./dto/user-update.dto";
import { UserCreated } from "./dto/user-created.dto";
import { UserCreating } from "./dto/user-creating.dto";
import { UserSelfGuard } from "../guards/user-self/user-self.guard";
import { UserUpdatePassword } from "./dto/user-update-password.dto";
import { PasswordEncryptionPipe } from "../pipes/password-encryption.pipe";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(":id")
	@UseGuards(JwtGuard)
	public async findById(@Param("id", ParseUUIDPipe) userId: string): Promise<UserInfo> {
		const foundUser = await this.userService.findById(userId, ["projects"]);
		return new UserInfo(foundUser);
	}

	@Get()
	@UseGuards(JwtGuard)
	public async findAll(
		@Query("offset", ParseIntPipe) offset: number,
		@Query("size", ParseIntPipe) size: number
	): Promise<UserInfo[]> {
		const foundUsers = await this.userService.findAll(offset, size, ["projects"]);
		return foundUsers.map(user => new UserInfo(user));
	}

	@Post()
	@UsePipes(new PasswordEncryptionPipe(["password"]))
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async create(@Body() user: UserCreating): Promise<UserCreated> {
		const id = await this.userService.create(user);
		return new UserCreated(id);
	}

	@Delete(":id")
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN]))
	public async delete(@Param("id", ParseUUIDPipe) userId: string): Promise<void> {
		await this.userService.delete(userId);
	}

	@Put(":id")
	@UseGuards(JwtGuard, new UserSelfGuard([]))
	public async update(@Param("id", ParseUUIDPipe) userId: string, @Body() user: UserUpdate): Promise<void> {
		await this.userService.update(userId, user);
	}

	@Patch(":id")
	@UsePipes(new PasswordEncryptionPipe(["oldPassword", "newPassword"]))
	@UseGuards(JwtGuard, new UserSelfGuard([]))
	public async updatePassword(
		@Param("id", ParseUUIDPipe) userId: string,
		@Body() user: UserUpdatePassword
	): Promise<void> {
		await this.userService.updatePassword(userId, user);
	}
}
