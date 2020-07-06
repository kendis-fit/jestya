import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class ProjectCacheService {
	constructor(private readonly databaseService: DatabaseService) {}

	public async initProjects(userLogin: string, projectsId: string[]): Promise<void> {
		const key = this.getProjectsKey(userLogin);
		this.databaseService.set<string[]>(key, projectsId);
	}

	public async addProject(userLogin: string, projectId: string): Promise<void> {
		const key = this.getProjectsKey(userLogin);
		await this.databaseService.addToArray<string>(key, projectId);
	}

	public async containProject(userLogin: string, projectId: string): Promise<boolean> {
		const key = this.getProjectsKey(userLogin);
		const projectsId = await this.databaseService.get<string[]>(key);
		return projectsId.some(id => id === projectId);
	}

	private getProjectsKey(userLogin: string) {
		return `${userLogin}:PROJECTS`;
	}
}
