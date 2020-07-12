import { User } from "../user.entity";
import { ProjectInfo } from "../../project/dto/project-info.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public login: string;

	@ApiProperty({ type: Date })
	public createdAt: Date;

	@ApiProperty()
	public isActive: boolean;

	@ApiProperty({ type: [ProjectInfo] })
	public projects: ProjectInfo[];

	constructor(public user: User) {
		this.id = user.id;
		this.name = user.name;
		this.createdAt = user.createdAt;
		this.isActive = user.isActive;
		this.projects = user.projects.map(project => new ProjectInfo(project));
	}
}
