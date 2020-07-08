import { Controller, Get, Param, Patch, Body, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskInfo } from "./dto/task-info.dto";
import { TaskUpdateActual } from "./dto/task-update-actual.dto";
import { TaskUpdate } from "./dto/task-update.dto";

@Controller("tasks")
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get(":id")
	public async findById(@Param("id") taskId: string): Promise<TaskInfo> {
		const task = await this.taskService.findById(taskId);
		return new TaskInfo(task);
	}

	@Patch(":id")
	public async setState(@Param("id") taskId: string, @Body() task: TaskUpdateActual): Promise<void> {
		await this.taskService.setState(taskId, task);
	}

	@Put(":id")
	public async update(@Param("id") taskId: string, @Body() task: TaskUpdate): Promise<void> {
		await this.taskService.update(taskId, task);
	}
}
