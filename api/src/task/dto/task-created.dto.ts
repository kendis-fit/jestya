import { ApiProperty } from "@nestjs/swagger";

export class TaskCreated {
	@ApiProperty()
	public id: string;

	constructor(id: string) {
		this.id = id;
	}
}
