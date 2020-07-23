import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

import { Task } from "./task.entity";
import { TaskUpdate } from "./dto/task-update.dto";
import { TaskCreating } from "./dto/task-creating.dto";
import { TaskUpdateActual } from "./dto/task-update-actual.dto";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>
	) {}

	public findAll(userId: string): Promise<Task[]> {
		const foundTasks = this.taskRepository.find({ creatorId: userId });
		return foundTasks;
	}

	public findById(taskId: string): Promise<Task> {
		const foundTask = this.taskRepository.findOne(taskId);
		if (!foundTask) {
			throw new NotFoundException("Task wasn't found");
		}
		return foundTask;
	}

	public async create(creatorId: string, task: TaskCreating): Promise<Task> {
		const newTask = new Task();
		newTask.name = task.name;
		newTask.description = task.description;
		newTask.priority = task.priority;
		newTask.creatorId = creatorId;
		newTask.executors = task.executorIds.map(id => {
			id;
		}) as any;
		newTask.board = { id: task.boardId } as any;
		newTask.components = task.componentIds.map(id => {
			id;
		}) as any;

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
		foundTask.board = { id: boardId } as any;

		await this.taskRepository.save(foundTask);
		return foundTask;
	}
}
