import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { User } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { mockedConfigService } from "../mocks/config.mock";

describe("Auth service", () => {
	let service: AuthService;
	let sign: jest.Mock;

	beforeEach(async () => {
		sign = jest.fn();
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				UserService,
				{
					provide: getRepositoryToken(User),
					useValue: {},
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
});
