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
		foundBoard.name = board.name ?? foundBoard.name;
		foundBoard.description = board.description ?? foundBoard.description;
		foundBoard.color = board.color ?? foundBoard.color;
		foundBoard.icon = board.icon ?? foundBoard.icon;
		foundBoard.position = board.position ?? foundBoard.position;
		return await this.boardRepository.save(foundBoard);
	}

	public async create(projectId: string, board: BoardCreating): Promise<Board> {
		const lastBoard = await this.boardRepository.findOne({
			order: {
				position: "DESC",
			},
		});
		const newBoard = new Board();
		newBoard.name = board.name;
		newBoard.description = board.description;
		newBoard.position = lastBoard.position + 1;
		newBoard.project = { id: projectId } as any;
		return await this.boardRepository.save(newBoard);
	}

	public async createBoards(boardsNames: string[]): Promise<Board[]> {
		const newBoards: Board[] = [];
		boardsNames.forEach(async (board, index) => {
			const newBoard = new Board();
			newBoard.position = index + 1;
			newBoard.name = board;
			await this.boardRepository.save(newBoard);
			newBoards.push(newBoard);
		});
		return newBoards;
	}

	public async remove(boardId: string): Promise<void> {
		const deleteResponse = await this.boardRepository.delete(boardId);
		if (!deleteResponse.affected) {
			throw new NotFoundException("Board is not found");
		}
	}
}
