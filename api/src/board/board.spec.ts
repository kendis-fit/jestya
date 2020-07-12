import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Board } from "./board.entity";
import { BoardService } from "./board.service";

describe("Board", () => {
	let service: BoardService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BoardService,
				{
					provide: getRepositoryToken(Board),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<BoardService>(BoardService);
	});

	describe("Board Service", () => {
		it("should be defined", () => {
			expect(service).toBeDefined();
		});
	});
});
