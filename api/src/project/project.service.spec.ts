import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Project } from "./project.entity";
import { Board } from "../board/board.entity";
import { ProjectService } from "./project.service";
import { BoardService } from "../board/board.service";
import { mockedConfigService } from "../mocks/config.mock";
import { ProjectController } from "./controllers/project.controller";

describe("Project Controller", () => {
	let service: ProjectService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProjectController],
			providers: [
				ProjectService,
				BoardService,
				{
					provide: ConfigService,
					useValue: mockedConfigService,
				},
				{
					provide: getRepositoryToken(Board),
					useValue: {},
				},
				{
					provide: getRepositoryToken(Project),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<ProjectService>(ProjectService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
