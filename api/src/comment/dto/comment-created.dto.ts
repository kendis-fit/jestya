import { ApiProperty } from "@nestjs/swagger";

export class CommentCreated {
	@ApiProperty()
	public id: string;

	constructor(id: string) {
		this.id = id;
	}
}
