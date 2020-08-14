import { ApiProperty } from "@nestjs/swagger";

import { Project } from "../project.entity";
import { ProjectBoardInfo } from "./project-board-info.dto";

export class ProjectInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public description: string;

	@ApiProperty({ type: [ProjectBoardInfo] })
	public boards: ProjectBoardInfo[];

	@ApiProperty()
	public isArchive: boolean;

	constructor(project: Project) {
		this.id = project.id;
		this.name = project.name;
		this.description = project.description;
		this.boards = project.boards.map(board => new ProjectBoardInfo(board));
		this.isArchive = !!project.finishedAt;
	}
}
