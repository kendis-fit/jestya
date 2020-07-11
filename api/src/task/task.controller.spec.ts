import { TypeOrmModule } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Task } from "./task.entity";
import { TaskService } from "./task.service";
import { UserModule } from "src/user/user.module";
import { TaskController } from "./task.controller";
import { BoardModule } from "src/board/board.module";
import { ComponentModule } from "src/component/component.module";

describe("Task Controller", () => {
	let controller: TaskController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [TypeOrmModule.forFeature([Task]), BoardModule, UserModule, ComponentModule],
			controllers: [TaskController],
			providers: [TaskService],
			exports: [TaskService],
		}).compile();

		controller = module.get<TaskController>(TaskController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
