import { DeleteResult } from "typeorm";
import { plainToClass } from "class-transformer";
import { NotFoundException } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Board } from "./board.entity";
import { BoardService } from "./board.service";
import { BoardCreating } from "./dto/board-creating.dto";
import { BoardUpdate } from "./dto/board-update.dto";

interface IBoardRepositoryMock {
	findOne: jest.Mock;
	save: jest.Mock;
	delete: jest.Mock;
}

describe("Board service", () => {
	let service: BoardService;
	let boardRepository: IBoardRepositoryMock;

	beforeEach(async () => {
		boardRepository = {
			findOne: jest.fn(),
			save: jest.fn(),
			delete: jest.fn(),
		};
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BoardService,
				{
					provide: getRepositoryToken(Board),
					useValue: boardRepository,
				},
			],
		}).compile();

		service = module.get<BoardService>(BoardService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	let board: Board;

	beforeEach(() => {
		board = new Board();
	});

	describe("method findById", () => {
		describe("if board is found", () => {
			beforeEach(() => {
				boardRepository.findOne.mockReturnValue(board);
			});

			it("should return the board", async () => {
				const foundBoard = await service.findById("some_id");
				expect(foundBoard).toEqual(board);
			});
		});

		describe("else board isn't found", () => {
			beforeEach(() => {
				boardRepository.findOne.mockReturnValue(undefined);
			});

			it("shoud throw an error", async () => {
				await expect(service.findById("some_id")).rejects.toThrow(NotFoundException);
			});
		});
	});

	describe("method create", () => {
		let newBoard: Board;
		let boardCreating: BoardCreating;

		beforeEach(async () => {
			boardCreating = plainToClass(BoardCreating, board);
			boardRepository.save.mockReturnValue({ id: "123a", ...board });
			newBoard = await service.create(boardCreating);
		});

		it("should be defined", () => {
			expect(newBoard).toBeDefined();
		});

		it("should generate id of the board", () => {
			expect(newBoard.id).toEqual("123a");
		});
	});

	describe("method update", () => {
		describe("if board is found", () => {
			let boardUpdated: Board;
			let boardUpdate: Board;

			beforeEach(async () => {
				boardRepository.findOne.mockReturnValue(board);
				jest.spyOn(service, "findById").mockReturnValue(Promise.resolve(board));

				boardUpdate = new Board();
				boardUpdate.name = "test";
				boardUpdate.description = "test2";

				boardRepository.save.mockReturnValue(plainToClass(BoardUpdate, boardUpdate));
				boardUpdated = await service.update("123", boardUpdate);
			});

			it("should be defined", () => {
				expect(boardUpdated).toBeDefined();
			});

			it("should contain fields name and description", () => {
				expect(boardUpdated).toEqual(boardUpdate);
			});
		});

		describe("else board isn't found", () => {
			beforeEach(() => {
				jest.spyOn(service, "findById").mockRejectedValue(new NotFoundException());
			});

			it("should throw an error 404", async () => {
				await expect(
					service.update("123", plainToClass(BoardUpdate, board))
				).rejects.toThrow(NotFoundException);
			});
		});
	});

	describe("method remove", () => {
		let deleteResult: DeleteResult;

		beforeEach(() => {
			deleteResult = new DeleteResult();
		});

		describe("if board is found", () => {
			beforeEach(() => {
				deleteResult.affected = 1;
				boardRepository.delete.mockReturnValue(deleteResult);
			});

			it("should be undefined, because the function doesn't return anything", async () => {
				const fun = await service.remove("123");
				expect(fun).toBeUndefined();
			});
		});

		describe("else board isn't found", () => {
			beforeEach(() => {
				deleteResult.affected = 0;
				boardRepository.delete.mockReturnValue(deleteResult);
			});

			it("should throw an error 404", async () => {
				await expect(service.remove("231")).rejects.toThrow(NotFoundException);
			});
		});
	});

	describe("method createStandartBoards", () => {
		let standartBoards: string[];

		beforeEach(() => {
			standartBoards = ["TO DO", "IN PROCESSING", "DONE"];
			boardRepository.save.mockImplementation(board => board);
		});

		it("should have same names that pass", async () => {
			const boards = await service.createBoards(standartBoards);
			boards.forEach((board, index) => {
				expect(board.name).toEqual(standartBoards[index]);
			});
		});
	});
});
