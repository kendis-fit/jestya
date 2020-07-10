import { Controller, Put, Delete, Param, Body, Post } from "@nestjs/common";

import { BoardService } from "./board.service";
import { BoardUpdate } from "./dto/board-update.dto";
import { TaskCreated } from "src/task/dto/task-created.dto";
import { TaskCreating } from "src/task/dto/task-creating.dto";

@Controller("boards")
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Put(":id")
	public async update(@Param("id") boardId: string, @Body() board: BoardUpdate): Promise<void> {
		await this.boardService.update(boardId, board);
	}

	@Delete(":id")
	public async remove(@Param("id") boardId: string): Promise<void> {
		await this.boardService.remove(boardId);
	}

	@Post(":id/tasks")
	public async createTask(@Param("id") boardId: string, @Body() task: TaskCreating): Promise<TaskCreated> {
		const newTask = await this.boardService.createTask(boardId, task);
		return new TaskCreated(newTask.id);
	}
}
