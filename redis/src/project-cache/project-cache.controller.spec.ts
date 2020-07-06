import { Test, TestingModule } from "@nestjs/testing";
import { ProjectCacheController } from "./project-cache.controller";

describe("ProjectCache Controller", () => {
	let controller: ProjectCacheController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProjectCacheController],
		}).compile();

		controller = module.get<ProjectCacheController>(ProjectCacheController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
