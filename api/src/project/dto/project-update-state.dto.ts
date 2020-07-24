import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601 } from "class-validator";

import { Project } from "../project.entity";

export class ProjectUpdateState {
	@ApiProperty()
	@IsISO8601()
	public finishedAt: Date;

	constructor(project: Project) {
		this.finishedAt = project.finishedAt;
	}
}
