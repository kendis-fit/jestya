import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Project } from "./project.entity";
import { User } from "../user/user.entity";
import { Task } from "../task/task.entity";
import { Board } from "../board/board.entity";
import { TaskService } from "../task/task.service";
import { UserService } from "../user/user.service";
import { AuthService } from "../auth/auth.service";
import { ProjectService } from "./project.service";
import { Comment } from "../comment/comment.entity";
import { BoardService } from "../board/board.service";
import { ProjectController } from "./project.controller";
import { Component } from "../component/component.entity";
import { mockedConfigService } from "../mocks/config.mock";
import { CommentService } from "../comment/comment.service";
import { ComponentService } from "../component/component.service";

describe("Project Controller", () => {
	let controller: ProjectController;
	let service: ProjectService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProjectController],
			providers: [
				ProjectService,
				BoardService,
				CommentService,
				TaskService,
				AuthService,
				UserService,
				ComponentService,
				{
					provide: ConfigService,
					useValue: mockedConfigService,
				},
				{
					provide: getRepositoryToken(Component),
					useValue: {},
				},
				{
					provide: getRepositoryToken(User),
					useValue: {},
				},
				{
					provide: getRepositoryToken(Comment),
					useValue: {},
				},
				{
					provide: getRepositoryToken(Task),
					useValue: {},
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
