import { Repository } from "typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Project } from "./project.entity";
import { User } from "../user/user.entity";
import { Board } from "../board/board.entity";
import { BoardService } from "../board/board.service";
import { ProjectCreating } from "./dto/project-creating.dto";
import { ProjectUpdateState } from "./dto/project-update-state.dto";

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(Project)
		private readonly projectsRepository: Repository<Project>,
		private readonly boardService: BoardService
	) {}

	public async findById(projectId: string): Promise<Project> {
		const foundProject = await this.projectsRepository.findOne(projectId);
		if (!foundProject) {
			throw new HttpException({ message: "Project wasn't found" }, HttpStatus.NOT_FOUND);
		}
		return foundProject;
	}

	public async findAll(userId: string): Promise<[Project[], number]> {
		const [projects, count] = await this.projectsRepository
			.createQueryBuilder("project")
			.innerJoin("project.users", "user")
			.where("user.id = :id", { id: userId })
			.getManyAndCount();

		return [projects, count];
	}

	public async findAllBoards(projectId: string): Promise<Board[]> {
		const foundProject = await this.findById(projectId);
		return foundProject.boards;
	}

	public async findAllUsers(projectId: string): Promise<User[]> {
		const foundProject = await this.findById(projectId);
		return foundProject.users;
	}

	public async create(userId: string, project: ProjectCreating): Promise<Project> {
		const standartBoards = await this.boardService.createStandartBoards();

		const newProject = new Project();
		newProject.name = project.name;
		newProject.description = project.description;
		newProject.creatorId = userId;
		newProject.boards.push(...standartBoards);

		await this.projectsRepository.save(newProject);
		return newProject;
	}

	public async addUser(projectId: string, userId: string): Promise<void> {
		const foundProject = await this.findById(projectId);
		foundProject.userIds.push(userId);
		await this.projectsRepository.save(foundProject);
	}

	public async updateState(projectId: string, project: ProjectUpdateState): Promise<Project> {
		const foundProject = await this.findById(projectId);
		foundProject.finishedAt = project.finishedAt;
		await this.projectsRepository.save(foundProject);
		return foundProject;
	}

	public async removeUser(projectId: string, userId: string): Promise<void> {
		const foundProject = await this.findById(projectId);
		foundProject.userIds = foundProject.userIds.filter(id => id !== userId);
		await this.projectsRepository.save(foundProject);
	}
}
