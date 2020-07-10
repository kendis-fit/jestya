import { Controller, Get, Param, Patch, Body, Put, Post } from "@nestjs/common";

import { TaskService } from "./task.service";
import { TaskInfo } from "./dto/task-info.dto";
import { TaskUpdate } from "./dto/task-update.dto";
import { TaskCreated } from "./dto/task-created.dto";
import { TaskCreating } from "./dto/task-creating.dto";
import { TaskCommentInfo } from "./dto/task-comment-info.dto";
import { TaskUpdateActual } from "./dto/task-update-actual.dto";
import { TaskComponentInfo } from "./dto/task-component-info.dto";

@Controller("tasks")
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get(":id")
	public async findById(@Param("id") taskId: string): Promise<TaskInfo> {
		const task = await this.taskService.findById(taskId);
		return new TaskInfo(task);
	}

	@Get(":id/components")
	public async findComponents(@Param("id") taskId: string): Promise<TaskComponentInfo[]> {
		const task = await this.taskService.findById(taskId);
		return task.components.map(component => new TaskComponentInfo(component));
	}

	@Get(":id/comments")
	public async findComments(@Param("id") taskId: string): Promise<TaskCommentInfo[]> {
		const task = await this.taskService.findById(taskId);
		return task.comments.map(comment => new TaskCommentInfo(comment));
	}

	@Patch(":id")
	public async setState(@Param("id") taskId: string, @Body() task: TaskUpdateActual): Promise<void> {
		await this.taskService.setState(taskId, task);
	}

	@Put(":id")
	public async update(@Param("id") taskId: string, @Body() task: TaskUpdate): Promise<void> {
		await this.taskService.update(taskId, task);
	}

	@Post()
	public async create(@Body() task: TaskCreating): Promise<TaskCreated> {
		const newTask = await this.taskService.create(task);
		return new TaskCreated(newTask.id);
	}
}
