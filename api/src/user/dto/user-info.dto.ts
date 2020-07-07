import { User } from "../user.entity";
import { ProjectInfo } from "src/project/dto/project-info.dto";

export class UserInfo {
	public id: string;
	public name: string;
	public login: string;
	public createdAt: Date;
	public isActive: boolean;
	public projects: ProjectInfo[];

	constructor(public user: User) {
		this.id = user.id;
		this.name = user.name;
		this.createdAt = user.createdAt;
		this.isActive = user.isActive;
		this.projects = user.projects.map(project => new ProjectInfo(project.id, project.name, project.description));
	}
}
