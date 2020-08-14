import { ApiProperty } from "@nestjs/swagger";

import { Project } from "../../project/project.entity";

export class UserProjectInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public description: string;

	constructor(project: Project) {
		this.id = project.id;
		this.name = project.name;
		this.description = project.description;
	}
}
