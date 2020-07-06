import { MessagePattern } from "@nestjs/microservices";
import { ProjectCacheService } from "./project-cache.service";

export class ProjectCacheController {
	constructor(private readonly projectCache: ProjectCacheService) {}

	@MessagePattern("initProjects")
	public initProjects() {}

	@MessagePattern("addProject")
	public addProject() {}

	@MessagePattern("containProject")
	public containProject() {}
}
