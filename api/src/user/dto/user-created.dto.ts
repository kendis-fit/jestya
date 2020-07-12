import { ApiProperty } from "@nestjs/swagger";

export class UserCreated {
	@ApiProperty()
	public id: string;

	constructor(id: string) {
		this.id = id;
	}
}
