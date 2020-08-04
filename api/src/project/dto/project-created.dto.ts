import { ApiProperty } from "@nestjs/swagger";
import { ProjectBoardInfo } from "./project-board-info.dto";
import { Project } from "../project.entity";

export class ProjectCreated {
	@ApiProperty()
	public id: string;

	@ApiProperty({ type: [ProjectBoardInfo] })
	public boards: ProjectBoardInfo[];

	constructor(project: Project) {
		this.id = project.id;
		this.boards = project.boards.map(board => ({
			name: board.name,
			countTasks: 0,
		}));
	}
}
