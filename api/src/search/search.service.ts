import { Repository, Like } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "../user/user.entity";
import { Project } from "../project/project.entity";

@Injectable()
export class SearchService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>
	) {}

	public async getUsers(field: string, value: string): Promise<User[]> {
		const users = await this.userRepository.find({ [field]: Like(`%${value}%`) });
		return users;
	}

	public async getProjects(field: string, value: string): Promise<Project[]> {
		const projects = await this.projectRepository.find({ [field]: Like(`%${value}%`) });
		return projects;
	}
}
