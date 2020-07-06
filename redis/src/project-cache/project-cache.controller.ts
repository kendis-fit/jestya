import { MessagePattern } from "@nestjs/microservices";

import { ProjectInit } from "./dto/project-init.dto";
import { ProjectItem } from "./dto/project-item.dto";
import { ProjectCacheService } from "./project-cache.service";

export class ProjectCacheController {
	constructor(private readonly projectCache: ProjectCacheService) {}

	@MessagePattern("initProjects")
	public async initProjects(project: ProjectInit): Promise<void> {
		await this.projectCache.initProjects(project.userLogin, project.projectsId);
	}

	@MessagePattern("addProject")
	public async addProject(project: ProjectItem): Promise<void> {
		await this.projectCache.addProject(project.userLogin, project.projectId);
	}

	@MessagePattern("containProject")
	public async containProject(project: ProjectItem): Promise<boolean> {
		const containedProject = await this.projectCache.containProject(project.userLogin, project.projectId);
		return containedProject;
	}
}
