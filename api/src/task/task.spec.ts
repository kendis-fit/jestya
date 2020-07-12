import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Task } from "./task.entity";
import { User } from "../user/user.entity";
import { TaskService } from "./task.service";
import { Board } from "../board/board.entity";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { BoardService } from "../board/board.service";
import { Component } from "../component/component.entity";
import { mockedConfigService } from "../mocks/config.mock";
import { ComponentService } from "../component/component.service";

describe("Task", () => {
	let service: TaskService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BoardService,
				UserService,
				ComponentService,
				AuthService,
				TaskService,
				{
					provide: getRepositoryToken(Task),
					useValue: {},
				},
				{
					provide: getRepositoryToken(Board),
					useValue: {},
				},
				{
					provide: getRepositoryToken(User),
					useValue: {},
				},
				{
					provide: getRepositoryToken(Component),
					useValue: {},
				},
				{
					provide: ConfigService,
					useValue: mockedConfigService,
				},
			],
		}).compile();

		service = module.get<TaskService>(TaskService);
	});

	describe("Task Service", () => {
		it("should be defined", () => {
			expect(service).toBeDefined();
		});
	});
});
