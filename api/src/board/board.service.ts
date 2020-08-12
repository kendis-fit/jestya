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

	public async findById(boardId: string, relations?: string[]): Promise<Board> {
		const foundBoard = await this.boardRepository.findOne(boardId, { relations });
		if (!foundBoard) {
			throw new NotFoundException("Board wasn't found");
		}
		return foundBoard;
	}

	public async update(boardId: string, board: BoardUpdate): Promise<Board> {
		const positionExisted = typeof board.position !== "undefined";
		const foundBoard = await this.findById(
			boardId,
			positionExisted ? ["project", "project.boards"] : []
		);
		foundBoard.name = board.name ?? foundBoard.name;
		foundBoard.description = board.description ?? foundBoard.description;
		foundBoard.color = board.color ?? foundBoard.color;
		foundBoard.icon = board.icon ?? foundBoard.icon;
		if (positionExisted) {
			const boardWithCurrentPosition = foundBoard.project.boards.find(
				b => b.position === board.position
			);
			boardWithCurrentPosition.position = foundBoard.position;
			foundBoard.position = board.position;
			await this.boardRepository.save(boardWithCurrentPosition);
		}
		return await this.boardRepository.save(foundBoard);
	}

	public async create(projectId: string, board: BoardCreating): Promise<Board> {
		const lastBoard = await this.boardRepository.findOne({
			order: {
				position: "DESC",
			},
			where: {
				project: {
					id: projectId,
				},
			},
		});
		const newBoard = new Board();
		newBoard.name = board.name;
		newBoard.description = board.description;
		newBoard.position = lastBoard ? lastBoard.position + 1 : 0;
		newBoard.project = { id: projectId } as any;
		return await this.boardRepository.save(newBoard);
	}

	public async createBoards(boardsNames: string[]): Promise<Board[]> {
		const newBoards: Board[] = [];
		let counter = 0;
		for (const board of boardsNames) {
			const newBoard = new Board();
			newBoard.name = board;
			newBoard.position = counter++;
			await this.boardRepository.save(newBoard);
			newBoards.push(newBoard);
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
