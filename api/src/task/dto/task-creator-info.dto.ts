import { User } from "../../user/user.entity";

export class TaskCreatorInfo {
	public id: string;
	public name: string;

	constructor(user: User) {
		this.id = user.id;
		this.name = user.name;
	}
}
