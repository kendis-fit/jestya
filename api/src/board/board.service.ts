import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

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
			throw new NotFoundException("Board wasn't found");
		}
		return foundBoard;
	}

	public async update(boardId: string, board: BoardUpdate): Promise<Board> {
		const foundBoard = await this.findById(boardId);
		foundBoard.name = board.name;
		foundBoard.description = board.description;
		foundBoard.color = board.color;
		foundBoard.icon = board.icon;
		return await this.boardRepository.save(foundBoard);
	}

	public async create(board: BoardCreating, projectId?: string): Promise<Board> {
		const newBoard = new Board();
		newBoard.name = board.name;
		newBoard.description = board.description;
		if (projectId) {
			newBoard.project = { id: projectId } as any;
		}
		return await this.boardRepository.save(newBoard);
	}

	public async createBoards(boardsNames: string[]): Promise<Board[]> {
		const newBoards: Board[] = [];
		for (const board of boardsNames) {
			const newBoard = new Board();
			newBoard.name = board;
			newBoards.push(await this.boardRepository.save(newBoard));
		}
		return newBoards;
	}

	public async remove(boardId: string): Promise<void> {
		const deleteResponse = await this.boardRepository.delete(boardId);
		if (!deleteResponse.affected) {
			throw new NotFoundException("Board is not found");
		}
	}
}
