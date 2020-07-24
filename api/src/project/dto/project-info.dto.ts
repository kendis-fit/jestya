import { Project } from "../project.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ProjectInfo {
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
