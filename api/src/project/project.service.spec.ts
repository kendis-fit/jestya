import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Project } from "./project.entity";
import { User } from "../user/user.entity";
import { Board } from "../board/board.entity";
import { ProjectService } from "./project.service";
import { UserService } from "../user/user.service";
import { BoardService } from "../board/board.service";
import { mockedConfigService } from "../mocks/config.mock";
import { ProjectController } from "./controllers/project.controller";

describe("Project service", () => {
	let service: ProjectService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProjectController],
			providers: [
				ProjectService,
				BoardService,
				UserService,
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
				{
					provide: getRepositoryToken(User),
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
