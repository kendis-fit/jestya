import { Project } from "../project.entity";

export class ProjectInfo {
	public id: string;
	public name: string;
	public description: string;

	constructor(project: Project) {
		this.id = project.id;
		this.name = project.name;
		this.description = project.description;
	}
}
