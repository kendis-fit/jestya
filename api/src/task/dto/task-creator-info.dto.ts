import { ApiProperty } from "@nestjs/swagger";

import { User } from "../../user/user.entity";

export class TaskCreatorInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	constructor(user: User) {
		this.id = user.id;
		this.name = user.name;
	}
}
