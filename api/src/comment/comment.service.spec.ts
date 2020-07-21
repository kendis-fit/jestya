import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Comment } from "./comment.entity";
import { CommentService } from "./comment.service";

describe("Comment service", () => {
	let service: CommentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CommentService,
				{
					provide: getRepositoryToken(Comment),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<CommentService>(CommentService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
