import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException, ForbiddenException } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { User, Role } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { UserLogin } from "../user/dto/user-login.dto";
import { mockedConfigService } from "../mocks/config.mock";
import { UserRegistration } from "../user/dto/user-registration.dto";

interface IUserServiceMock {
	findByLogin: jest.Mock;
	count: jest.Mock;
	create: jest.Mock;
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
			create: jest.fn(),
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

				it("should throw an error 400", async () => {
					await expect(service.login(userLogin)).rejects.toThrow(ForbiddenException);
				});
			});
		});

		describe("else user isn't found", () => {
			beforeEach(() => {
				userService.findByLogin.mockRejectedValue(new NotFoundException());
			});

			it("should throw an error 404", async () => {
				await expect(service.login(userLogin)).rejects.toThrow(NotFoundException);
			});
		});
	});

	describe("method registration", () => {
		let user: User;
		let userRegistration: UserRegistration;

		beforeEach(() => {
			user = new User();
			user.login = "just_a_login";
			user.password = "just_a_password";
			user.name = "name";
			userRegistration = new UserRegistration(user);
		});

		describe("if nobody signed up", () => {
			let newUser: User;

			beforeEach(async () => {
				userService.count.mockReturnValue(0);
				newUser = await service.registration(userRegistration);
			});

			it("should be defined", () => {
				expect(newUser).toBeDefined();
			});

			it("should have role SUPER_ADMIN", () => {
				expect(newUser.role).toEqual(Role.SUPER_ADMIN);
			});
		});

		describe("else anybody signed up", () => {
			beforeEach(() => {
				userService.count.mockReturnValue(1);
			});

			it("should throw an error 403", async () => {
				await expect(service.registration(userRegistration)).rejects.toThrow(ForbiddenException);
			});
		});
	});
});
