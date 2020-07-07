import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { Repository } from "typeorm";
import { BoardCreating } from "./dto/board-creating.dto";

@Injectable()
export class BoardService {
	constructor(
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>
	) {}

	public async create(board: BoardCreating): Promise<Board> {
		const newBoard = new Board();
		newBoard.name = board.name;
		newBoard.description = board.description;
		await this.boardRepository.save(newBoard);
		return newBoard;
	}

	public async findStandartBoards(): Promise<Board[]> {
		let boards = await this.boardRepository
			.createQueryBuilder()
			.where("boards.name in (:todo, :inproc, :done)", { todo: "TO DO", inproc: "IN PROCESSING", done: "DONE" })
			.getMany();

		if (boards.length === 0) {
			const standartBoards = ["TO DO", "IN PROCESSING", "DONE"];
			const newBoards: Board[] = [];
			standartBoards.forEach(async board => {
				const newBoard = await this.create(new BoardCreating(board));
				newBoards.push(newBoard);
			});
		} else {
			// todo
		}

		return boards;
	}
}
