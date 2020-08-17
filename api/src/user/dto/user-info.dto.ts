import { ApiProperty } from "@nestjs/swagger";

import { User, Role } from "../user.entity";
import { UserProjectInfo } from "./user-project-info.dto";

export class UserInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty({ enum: Role })
	public role: Role;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public login: string;

	@ApiProperty({ type: Date })
	public createdAt: Date;

	@ApiProperty()
	public isActive: boolean;

	@ApiProperty({ type: [UserProjectInfo] })
	public projects: UserProjectInfo[];

	constructor(user: User) {
		this.id = user.id;
		this.login = user.login;
		this.role = user.role;
		this.name = user.name;
		this.createdAt = user.createdAt;
		this.isActive = user.isActive;
		this.projects = user.projects.map(project => new UserProjectInfo(project));
	}
}
