import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Param, ParseUUIDPipe, Patch, Put, Body, Post } from '@nestjs/common';

import { Role } from '../../user/user.entity';
import { TaskService } from '../../task/task.service';
import { User } from '../../decorators/user.decorator';
import { TaskInfo } from '../../task/dto/task-info.dto';
import { TaskUpdate } from '../../task/dto/task-update.dto';
import { TaskCreated } from '../../task/dto/task-created.dto';
import { TaskCreating } from '../../task/dto/task-creating.dto';
import { JwtProjectsGuard } from '../../guards/jwt-projects.guard';
import { RoleProjectsGuard } from '../../guards/role-projects.guard';
import { TaskCommentInfo } from '../../task/dto/task-comment-info.dto';
import { TaskUpdateActual } from '../../task/dto/task-update-actual.dto';
import { TaskComponentInfo } from '../../task/dto/task-component-info.dto';
import { JwtTasksGuard } from 'src/guards/jwt-tasks/jwt-tasks.guard';
import { RoleTasksGuard } from 'src/guards/role-tasks/role-tasks.guard';

@ApiBearerAuth()
@ApiTags("projects")
@Controller('projects')
export class ProjectTaskController {
    constructor(
        private readonly taskService: TaskService
    ) {}
    
	@Get(":id/tasks/:taskId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]))
	public async findById(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<TaskInfo> {
		const task = await this.taskService.findById(taskId);
		return new TaskInfo(task);
	}

	@Get(":id/tasks/:taskId/components")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]))
	public async findComponents(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<TaskComponentInfo[]> {
		const task = await this.taskService.findById(taskId);
		return task.components.map(component => new TaskComponentInfo(component));
	}

	@Get(":id/tasks/:taskId/comments")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]))
	public async findComments(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<TaskCommentInfo[]> {
		const task = await this.taskService.findById(taskId);
		return task.comments.map(comment => new TaskCommentInfo(comment));
	}

	@Patch(":id/tasks/:taskId")
	@UseGuards(JwtTasksGuard, new RoleProjectsGuard([Role.USER]), new RoleTasksGuard(true))
	public async setStateTask(@Param("taskId", ParseUUIDPipe) taskId: string, @Body() task: TaskUpdateActual): Promise<void> {
		await this.taskService.setState(taskId, task);
	}

	@Put(":id/tasks/:taskId")
	@UseGuards(JwtTasksGuard, new RoleProjectsGuard([Role.USER]), new RoleTasksGuard(true))
	public async updateTask(@Param("taskId", ParseUUIDPipe) taskId: string, @Body() task: TaskUpdate): Promise<void> {
		await this.taskService.update(taskId, task);
	}

	@Patch(":id/tasks/:taskId/boards/:boardId")
	public async changeBoard(@Param("taskId", ParseUUIDPipe) taskId: string, @Param("boardId") boardId: string): Promise<void> {
	}

	@Post(":id/tasks")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]))
	public async createTask(@Body() task: TaskCreating, @User("id") userId: string): Promise<TaskCreated> {
		const newTask = await this.taskService.create(userId, task);
		return new TaskCreated(newTask.id);
	}
}
