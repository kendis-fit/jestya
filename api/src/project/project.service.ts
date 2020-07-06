import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Project } from "./project.entity";
import { UserService } from "src/user/user.service";
import { ProjectCreated } from "./dto/project-created.dto";

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(Project)
		private readonly projectsRepository: Repository<Project>,
		private readonly userService: UserService
	) {}

	public async findAll(offset: number, size: number, userId: string) {}

	public async findAllBoards(projectId: string) {}

	public async findAllUsers(projectId: string) {}

	public async create(project: ProjectCreated, userId: string) {}

	public async addUser(projectId: string, userId: string) {}

	public async addBoard(projectId: string) {}

	public async delete(projectId: string, userId: string): Promise<void> {}

	public async removeUser(projectId: string, userId: string) {}

	public async removeBoard(projectId: string, boardId: string) {}
}
