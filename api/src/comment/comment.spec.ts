import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Comment } from "./comment.entity";
import { User } from "../user/user.entity";
import { Task } from "../task/task.entity";
import { Board } from "../board/board.entity";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { CommentService } from "./comment.service";
import { TaskService } from "../task/task.service";
import { BoardService } from "../board/board.service";
import { Component } from "../component/component.entity";
import { mockedConfigService } from "../mocks/config.mock";
import { ComponentService } from "../component/component.service";

describe("Project Controller", () => {
	let service: CommentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BoardService,
				UserService,
				ComponentService,
				CommentService,
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
					provide: getRepositoryToken(Comment),
					useValue: {},
				},
				{
					provide: ConfigService,
					useValue: mockedConfigService,
				},
			],
		}).compile();

		service = module.get<CommentService>(CommentService);
	});

	describe("Comment Service", () => {
		it("should be defined", () => {
			expect(service).toBeDefined();
		});
	});
});
