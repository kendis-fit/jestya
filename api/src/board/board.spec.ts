import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Board } from "./board.entity";
import { BoardService } from "./board.service";

describe("Board", () => {
	let service: BoardService;
	let findOne: jest.Mock;

	beforeEach(async () => {
		findOne = jest.fn();
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BoardService,
				{
					provide: getRepositoryToken(Board),
					useValue: {
						findOne,
					},
				},
			],
		}).compile();

		service = module.get<BoardService>(BoardService);
	});

	describe("Board Service", () => {
		it("should be defined", () => {
			expect(service).toBeDefined();
		});

		describe("if board is found", () => {
			let board: Board;
			beforeEach(() => {
				board = new Board();
				findOne.mockReturnValue(board);
			});

			it("should return the board", async () => {
				const foundBoard = await service.findById("some_id");
				expect(foundBoard).toEqual(board);
			});
		});

		describe("else board isn't found", () => {
			beforeEach(() => {
				findOne.mockReturnValue(undefined);
			});

			it("shoud throw an error", async () => {
				await expect(service.findById("some_id")).rejects.toThrow();
			});
		});
	});
});
