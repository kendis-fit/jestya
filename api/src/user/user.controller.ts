import {
	ApiTags,
	ApiBearerAuth,
	ApiOkResponse,
	ApiNotFoundResponse,
	ApiForbiddenResponse,
	ApiCreatedResponse,
	ApiConflictResponse,
	ApiNoContentResponse,
} from "@nestjs/swagger";
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
	HttpCode,
	Head,
} from "@nestjs/common";

import { Role } from "./user.entity";
import { UserService } from "./user.service";
import { UserInfo } from "./dto/user-info.dto";
import { JwtGuard } from "../guards/jwt/jwt.guard";
import { Error } from "../helpers/error.interfaces";
import { UserUpdate } from "./dto/user-update.dto";
import { UserCreated } from "./dto/user-created.dto";
import { RoleGuard } from "../guards/role/role.guard";
import { UserCreating } from "./dto/user-creating.dto";
import { UserSelfGuard } from "../guards/user-self/user-self.guard";
import { UserUpdatePassword } from "./dto/user-update-password.dto";
import { ParseEnumPipe } from "../pipes/parse-enum/parse-enum.pipe";
import { PasswordEncryptionPipe } from "../pipes/password-encryption/password-encryption.pipe";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiNoContentResponse()
	@ApiNotFoundResponse({ type: Error })
	@Head(":role")
	@UseGuards(JwtGuard)
	public async findByRole(@Param("role", new ParseEnumPipe(Role)) role: Role): Promise<void> {
		await this.userService.findByRole(role);
	}

	@ApiOkResponse({ type: UserInfo })
	@ApiNotFoundResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@Get(":id")
	@UseGuards(JwtGuard)
	public async findById(@Param("id", ParseUUIDPipe) userId: string): Promise<UserInfo> {
		const foundUser = await this.userService.findById(userId, ["projects"]);
		return new UserInfo(foundUser);
	}

	@ApiOkResponse({ type: [UserInfo] })
	@ApiForbiddenResponse({ type: Error })
	@Get()
	@UseGuards(JwtGuard)
	public async findAll(
		@Query("offset", ParseIntPipe) offset: number,
		@Query("size", ParseIntPipe) size: number
	): Promise<UserInfo[]> {
		const foundUsers = await this.userService.findAll(offset, size, ["projects"]);
		return foundUsers.map(user => new UserInfo(user));
	}

	@ApiCreatedResponse({ type: UserCreated })
	@ApiConflictResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@Post()
	@UsePipes(new PasswordEncryptionPipe(["password"]))
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async create(@Body() user: UserCreating): Promise<UserCreated> {
		const id = await this.userService.create(user);
		return new UserCreated(id);
	}

	@ApiNoContentResponse()
	@ApiNotFoundResponse({ type: Error })
	@HttpCode(204)
	@Delete(":id")
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN]))
	public async delete(@Param("id", ParseUUIDPipe) userId: string): Promise<void> {
		await this.userService.delete(userId);
	}

	@ApiNoContentResponse()
	@ApiNotFoundResponse({ type: Error })
	@HttpCode(204)
	@Put(":id")
	@UseGuards(JwtGuard, new UserSelfGuard([]))
	public async update(@Param("id", ParseUUIDPipe) userId: string, @Body() user: UserUpdate): Promise<void> {
		await this.userService.update(userId, user);
	}

	@ApiNoContentResponse()
	@ApiNotFoundResponse({ type: Error })
	@HttpCode(204)
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
