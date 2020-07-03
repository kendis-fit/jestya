import { Model } from "mongoose";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { IProject } from "./project.interface";
import { PROJECT_MODEL } from "./project.providers";
import { UserService } from "src/user/user.service";
import { ProjectCreated } from "./dto/project-created.dto";

@Injectable()
export class ProjectService {
	constructor(
		@Inject(PROJECT_MODEL) private readonly projects: Model<IProject>,
		private readonly userService: UserService
	) {}

	public async findAll(offset: number, size: number, userId: string) {}

	public async findAllBoards(projectId: string) {}

	public async findAllUsers(projectId: string) {}

	public async create(project: ProjectCreated, userId: string): Promise<string> {
		const user = await this.userService.findById(userId);
		const newProject = new this.projects(project);

		newProject.creator = user;
		user.projects.push(newProject);

		await newProject.save();
		await user.save();

		return newProject._id;

		// TO DO: add base borders
	}

	public async addUser(projectId: string, userId: string) {}

	public async addBoard(projectId: string) {}

	public async delete(projectId: string, userId: string): Promise<void> {
		const project = await this.projects.findById(projectId).populate({ path: "creator", select: "_id" });

		if (project.creator._id !== userId) {
			throw new HttpException({}, HttpStatus.FORBIDDEN);
		}

		await project.remove();

		// TO DO: remove borders
	}

	public async removeUser(projectId: string, userId: string) {}

	public async removeBoard(projectId: string, boardId: string) {}
}
