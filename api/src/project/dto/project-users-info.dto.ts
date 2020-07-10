import { User } from "../../user/user.entity";

export class ProjectUsersInfo {
	public id: string;
	public name: string;

	constructor(user: User) {
		this.id = user.id;
		this.name = user.name;
	}
}
