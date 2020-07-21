import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Task } from "./task.entity";
import { TaskService } from "./task.service";

describe("Task service", () => {
	let service: TaskService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TaskService,
				{
					provide: getRepositoryToken(Task),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<TaskService>(TaskService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
