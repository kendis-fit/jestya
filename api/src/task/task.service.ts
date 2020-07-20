import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { Task } from "./task.entity";
import { TaskUpdate } from "./dto/task-update.dto";
import { UserService } from "../user/user.service";
import { BoardService } from "../board/board.service";
import { TaskCreating } from "./dto/task-creating.dto";
import { TaskUpdateActual } from "./dto/task-update-actual.dto";
import { ComponentService } from "../component/component.service";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
		private readonly boardService: BoardService,
		private readonly userService: UserService,
		private readonly componentService: ComponentService
	) {}

	public findAll(userId: string): Promise<Task[]> {
		const foundTasks = this.taskRepository.find({ creatorId: userId });
		return foundTasks;
	}

	public findById(taskId: string): Promise<Task> {
		const foundTask = this.taskRepository.findOne(taskId);
		if (!foundTask) {
			throw new HttpException({ message: "Task wasn't found" }, HttpStatus.NOT_FOUND);
		}
		return foundTask;
	}

	public async create(creatorId: string, task: TaskCreating): Promise<Task> {
		const foundUsers = await this.userService.findByIds(task.executorIds);
		const foundComponents = await this.componentService.findByIds(task.componentIds);
		const foundBoard = await this.boardService.findById(task.boardId);

		const newTask = new Task();
		newTask.name = task.name;
		newTask.description = task.description;
		newTask.priority = task.priority;
		newTask.creatorId = creatorId;
		newTask.executors = foundUsers;
		newTask.board = foundBoard;
		newTask.components = foundComponents;

		await this.taskRepository.save(newTask);
		return newTask;
	}

	public async setState(taskId: string, task: TaskUpdateActual): Promise<Task> {
		const foundTask = await this.findById(taskId);
		foundTask.isActual = task.isActual;
		await this.taskRepository.save(foundTask);
		return foundTask;
	}

	public async update(taskId: string, task: TaskUpdate): Promise<Task> {
		const foundTask = await this.findById(taskId);
		foundTask.name = task.name;
		foundTask.description = task.description;
		foundTask.priority = task.priority;
		await this.taskRepository.save(foundTask);
		return foundTask;
	}

	public async changeBoard(taskId: string, boardId: string): Promise<Task> {
		const foundTask = await this.findById(taskId);
		foundTask.boardId = boardId;
		await this.taskRepository.save(foundTask);
		return foundTask;
	}
}
