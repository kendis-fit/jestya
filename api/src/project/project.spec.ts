import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Project } from "./project.entity";
import { Board } from "../board/board.entity";
import { ProjectService } from "./project.service";
import { BoardService } from "../board/board.service";
import { ProjectController } from "./project.controller";

describe("Project Controller", () => {
	let controller: ProjectController;
	let service: ProjectService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProjectController],
			providers: [
				ProjectService,
				BoardService,
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

		controller = module.get<ProjectController>(ProjectController);
		service = module.get<ProjectService>(ProjectService);
	});

	describe("ProjectController", () => {
		it("should be defined", () => {
			expect(controller).toBeDefined();
		});
	});

	describe("ProjectService", () => {
		it("should be defined", () => {
			expect(service).toBeDefined();
		});
	});
});
