import { Test, TestingModule } from "@nestjs/testing";
import { BoardController } from "./board.controller";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { BoardService } from "./board.service";

describe("Board", () => {
	let controller: BoardController;
	let service: BoardService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BoardController],
			providers: [
				BoardService,
				{
					provide: getRepositoryToken(Board),
					useValue: {},
				},
			],
		}).compile();

		controller = module.get<BoardController>(BoardController);
		service = module.get<BoardService>(BoardService);
	});

	describe("BoardController", () => {
		it("should be defined", () => {
			expect(controller).toBeDefined();
		});
	});

	describe("BoardService", () => {
		it("should be defined", () => {
			expect(service).toBeDefined();
		});
	});
});
