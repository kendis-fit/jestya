import { ApiProperty } from "@nestjs/swagger";

export class ProjectUpdateState {
	@ApiProperty()
	public isArchive: boolean;
}
