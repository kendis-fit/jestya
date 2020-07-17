import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";
import { mockedConfigService } from "../mocks/config.mock";
import { JwtStrategy } from "../strategies/jwt/jwt.strategy";

describe("Auth", () => {
	let service: AuthService;
	let strategy: JwtStrategy;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				JwtStrategy,
				{
					provide: ConfigService,
					useValue: mockedConfigService,
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		strategy = module.get<JwtStrategy>(JwtStrategy);
	});

	describe("AuthService", () => {
		it("should be defined", () => {
			expect(service).toBeDefined();
		});
	});

	describe("JwtStrategy", () => {
		it("should be defined", () => {
			expect(strategy).toBeDefined();
		});
	});
});
