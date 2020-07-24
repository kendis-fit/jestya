import { User } from "../../user/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ProjectUsersInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	constructor(user: User) {
		this.id = user.id;
		this.name = user.name;
	}
}
