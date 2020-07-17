import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, Post, Body, Delete, Param, UseGuards, Get, Query, Patch, Put, ParseIntPipe, ParseUUIDPipe } from "@nestjs/common";

import { Role } from "../user/user.entity";
import { JwtGuard } from "../guards/jwt.guard";
import { RoleGuard } from "../guards/role.guard";
import { TaskService } from "../task/task.service";
import { ProjectService } from "./project.service";
import { User } from "../decorators/user.decorator";
import { ProjectInfo } from "./dto/project-info.dto";
import { TaskInfo } from "../task/dto/task-info.dto";
import { BoardService } from "../board/board.service";
import { BoardInfo } from "../board/dto/board-info.dto";
import { TaskUpdate } from "../task/dto/task-update.dto";
import { ProjectCreated } from "./dto/project-created.dto";
import { TaskCreated } from "../task/dto/task-created.dto";
import { BoardUpdate } from "../board/dto/board-update.dto";
import { CommentService } from "../comment/comment.service";
import { ProjectCreating } from "./dto/project-creating.dto";
import { TaskCreating } from "../task/dto/task-creating.dto";
import { BoardCreated } from "../board/dto/board-created.dto";
import { ProjectUsersInfo } from "./dto/project-users-info.dto";
import { BoardCreating } from "../board/dto/board-creating.dto";
import { CommentUpdate } from "../comment/dto/comment-update.dto";
import { ProjectUpdateState } from "./dto/project-update-state.dto";
import { CommentCreated } from "../comment/dto/comment-created.dto";
import { TaskCommentInfo } from "../task/dto/task-comment-info.dto";
import { CommentCreating } from "../comment/dto/comment-creating.dto";
import { TaskUpdateActual } from "../task/dto/task-update-actual.dto";
import { TaskComponentInfo } from "../task/dto/task-component-info.dto";

@ApiBearerAuth()
@ApiTags("projects")
@Controller("projects")
export class ProjectController {
	constructor(
		private readonly projectService: ProjectService,
		private readonly commentService: CommentService,
		private readonly boardService: BoardService,
		private readonly taskService: TaskService,
	) {}

	@Get()
	@UseGuards(JwtGuard)
	public async findAll(@User("id") userId: string): Promise<ProjectInfo[]> {
		const projects = await this.projectService.findAll(userId);
		return projects.map(project => new ProjectInfo(project));
	}

	@Get(":id/boards")
	public async findAllBoards(@Param("id", ParseUUIDPipe) projectId: string): Promise<BoardInfo[]> {
		const boards = await this.projectService.findAllBoards(projectId);
		return boards.map(board => new BoardInfo(board));
	}

	@Get(":id/users")
	public async findAllUsers(@Param("id", ParseUUIDPipe) projectId: string): Promise<ProjectUsersInfo[]> {
		const users = await this.projectService.findAllUsers(projectId);
		return users.map(user => new ProjectUsersInfo(user));
	}

	@Post()
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async create(@Body() project: ProjectCreating, @User("id") userId: string): Promise<ProjectCreated> {
		const newProject = await this.projectService.create(userId, project);
		return new ProjectCreated(newProject.id);
	}

	@Post(":id/users/:userId")
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async addUser(@Param("id", ParseUUIDPipe) projectId: string, @Param("userId", ParseUUIDPipe) userId: string): Promise<void> {
		await this.addUser(projectId, userId);
	}

	@Post(":id/boards")
	@UseGuards(JwtGuard, new RoleGuard([Role.ADMIN]))
	public async addBoard(@Param("id", ParseUUIDPipe) projectId: string, @Body() board: BoardCreating): Promise<BoardCreated> {
		const newBoard = await this.projectService.addBoard(projectId, board);
		return new BoardCreated(newBoard.id);
	}

	@Patch(":id")
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async updateState(@Param("id", ParseUUIDPipe) projectId: string, @Body() project: ProjectUpdateState): Promise<void> {
		await this.projectService.updateState(projectId, project);
	}

	@Delete(":id/users/:userId")
	@UseGuards(JwtGuard, new RoleGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async removeUser(@Param("id", ParseUUIDPipe) projectId: string, @Param("userId", ParseUUIDPipe) userId: string): Promise<void> {
		await this.projectService.removeUser(projectId, userId);
	}

	@Put(":id/boards/:boardId")
	public async updateBoard(@Param("boardId", ParseUUIDPipe) boardId: string, @Body() board: BoardUpdate): Promise<void> {
		await this.boardService.update(boardId, board);
	}

	@Delete(":id/boards/:boardId")
	public async removeBoard(@Param("boardId", ParseUUIDPipe) boardId: string): Promise<void> {
		await this.boardService.remove(boardId);
	}

	@Post(":id/comments")
	@UseGuards(JwtGuard)
	public async createComment(@Body() comment: CommentCreating, @User("id") userId: string): Promise<CommentCreated> {
		const newComment = await this.commentService.create(userId, comment);
		return new CommentCreated(newComment.id);
	}

	@Put(":id/comments/:commentId")
	public async updateComment(@Param("commentId", ParseUUIDPipe) commentId: string, @Body() comment: CommentUpdate): Promise<void> {
		await this.commentService.update(commentId, comment);
	}

	@Delete(":id/comments/:commentId")
	public async removeComment(@Param("commentId", ParseUUIDPipe) commentId: string): Promise<void> {
		await this.commentService.remove(commentId);
	}

	@Get(":id/tasks/:taskId")
	public async findById(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<TaskInfo> {
		const task = await this.taskService.findById(taskId);
		return new TaskInfo(task);
	}

	@Get(":id/tasks/:taskId/components")
	public async findComponents(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<TaskComponentInfo[]> {
		const task = await this.taskService.findById(taskId);
		return task.components.map(component => new TaskComponentInfo(component));
	}

	@Get(":id/tasks/:taskId/comments")
	public async findComments(@Param("taskId", ParseUUIDPipe) taskId: string): Promise<TaskCommentInfo[]> {
		const task = await this.taskService.findById(taskId);
		return task.comments.map(comment => new TaskCommentInfo(comment));
	}

	@Patch(":id/tasks/:taskId")
	public async setStateTask(@Param("taskId", ParseUUIDPipe) taskId: string, @Body() task: TaskUpdateActual): Promise<void> {
		await this.taskService.setState(taskId, task);
	}

	@Put(":id/tasks/:taskId")
	public async updateTask(@Param("taskId", ParseUUIDPipe) taskId: string, @Body() task: TaskUpdate): Promise<void> {
		await this.taskService.update(taskId, task);
	}

	@Post(":id/tasks")
	@UseGuards(JwtGuard)
	public async createTask(@Body() task: TaskCreating, @User("id") userId: string): Promise<TaskCreated> {
		const newTask = await this.taskService.create(userId, task);
		return new TaskCreated(newTask.id);
	}
}
