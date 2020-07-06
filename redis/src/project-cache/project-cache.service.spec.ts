import { Test, TestingModule } from "@nestjs/testing";
import { ProjectCacheService } from "./project-cache.service";

describe("ProjectCacheService", () => {
	let service: ProjectCacheService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProjectCacheService],
		}).compile();

		service = module.get<ProjectCacheService>(ProjectCacheService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
