import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

import { User } from "./user.entity";
import { mockedConfigService } from "../mocks/config.mock";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";

describe("User", () => {
	let controller: UserController;
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				UserService,
				AuthService,
				{
					provide: getRepositoryToken(User),
					useValue: {},
				},
				{
					provide: ConfigService,
					useValue: mockedConfigService,
				},
			],
		}).compile();

		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
	});

	describe("UserController", () => {
		it("should be defined", () => {
			expect(controller).toBeDefined();
		});
	});

	describe("UserService", () => {
		it("should be defined", () => {
			expect(service).toBeDefined();
		});
	});
});
