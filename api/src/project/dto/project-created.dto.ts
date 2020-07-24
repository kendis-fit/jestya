import { ApiProperty } from "@nestjs/swagger";

export class ProjectCreated {
	@ApiProperty()
	public id: string;

	constructor(id: string) {
		this.id = id;
	}
}
