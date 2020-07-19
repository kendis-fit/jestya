import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { Board } from "./board.entity";
import { BoardUpdate } from "./dto/board-update.dto";
import { BoardCreating } from "./dto/board-creating.dto";

@Injectable()
export class BoardService {
	constructor(
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>
	) {}

	public async findById(boardId: string): Promise<Board> {
		const foundBoard = await this.boardRepository.findOne(boardId);
		if (!foundBoard) {
			throw new HttpException({ message: "Board wasn't found" }, HttpStatus.NOT_FOUND);
		}
		return foundBoard;
	}

	public async update(boardId: string, board: BoardUpdate): Promise<Board> {
		const foundBoard = await this.findById(boardId);
		foundBoard.name = board.name;
		foundBoard.description = board.description;
		await this.boardRepository.save(board);
		return foundBoard;
	}

	public async create(board: BoardCreating, projectId?: string): Promise<Board> {
		const newBoard = new Board();
		newBoard.name = board.name;
		newBoard.description = board.description;
		if (projectId) {
			newBoard.projectId = projectId;
		}
		await this.boardRepository.save(newBoard);
		return newBoard;
	}

	public async createStandartBoards(): Promise<Board[]> {
		const standartBoards = ["TO DO", "IN PROCESSING", "DONE"];
		const newBoards: Board[] = [];
		standartBoards.forEach(async board => {
			const newBoard = await this.create(new BoardCreating(board));
			newBoards.push(newBoard);
		});
		return newBoards;
	}

	public async remove(boardId: string): Promise<void> {
		const deleteResponse = await this.boardRepository.delete(boardId);
		if (!deleteResponse.affected) {
			throw new HttpException({ message: "Board is not found" }, HttpStatus.NOT_FOUND);
		}
	}
}
