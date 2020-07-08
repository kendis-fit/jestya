import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { TaskCreating } from "./dto/task-creating.dto";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		public taskRepository: Repository<Task>
	) {}

	public findById(taskId: string) {
		const foundTask = this.taskRepository.findOne(taskId);
		if (!foundTask) {
			throw new HttpException({ message: "" }, HttpStatus.NOT_FOUND);
		}
		return foundTask;
	}

	public async create(task: TaskCreating): Promise<Task> {
		const newTask = new Task();
		newTask.name = task.name;
		newTask.description = task.description;
		newTask.priority = task.priority;
		/* TO_DO Logic with components */
		await this.taskRepository.save(newTask);
		return newTask;
	}
}
