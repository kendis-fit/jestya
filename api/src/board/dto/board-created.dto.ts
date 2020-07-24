import { ApiProperty } from "@nestjs/swagger";

export class BoardCreated {
	@ApiProperty()
	public id: string;

	constructor(id: string) {
		this.id = id;
	}
}
