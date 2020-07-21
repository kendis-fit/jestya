import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { User } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { mockedConfigService } from "../mocks/config.mock";
import { UserLogin } from "../user/dto/user-login.dto";

interface IUserServiceMock {
	findByLogin: jest.Mock;
	count: jest.Mock;
}

interface IUserRepositoryMock {
	findOne: jest.Mock;
}

describe("Auth service", () => {
	let service: AuthService;
	let sign: jest.Mock;
	let userService: IUserServiceMock;
	let userRepository: IUserRepositoryMock;

	beforeEach(async () => {
		sign = jest.fn();
		userService = {
			count: jest.fn(),
			findByLogin: jest.fn(),
		};
		userRepository = {
			findOne: jest.fn(),
		};
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UserService,
					useValue: userService,
				},
				{
					provide: getRepositoryToken(User),
					useValue: userRepository,
				},
				{
					provide: ConfigService,
					useValue: mockedConfigService,
				},
				{
					provide: JwtService,
					useValue: { sign },
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("method login", () => {
		let user: User;
		let userLogin: UserLogin;

		beforeEach(() => {
			user = new User();
			user.login = "just_a_login";
			user.password = "just_a_password";
			userLogin = new UserLogin(user);
		});

		describe("if user is found", () => {
			let token: string;

			beforeEach(() => {
				userRepository.findOne.mockReturnValue(user);
				userService.findByLogin.mockReturnValue(user);
				sign.mockReturnValue("SHA-256 HASH");
			});

			it("should return a token", async () => {
				token = await service.login(userLogin);
				expect(token).toEqual("SHA-256 HASH");
			});

			describe("passwords aren't equal", () => {
				let wrongUser: User;
				let wrongUserLogin: UserLogin;

				beforeEach(() => {
					wrongUser = new User();
					wrongUser.password = "wrong_a_password";
					wrongUserLogin = new UserLogin(wrongUser);
					userService.findByLogin.mockReturnValue(wrongUserLogin);
				});

				it("should throw an error", async () => {
					await expect(service.login(user)).rejects.toThrow(BadRequestException);
				});
			});
		});
	});
});
