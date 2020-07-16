import { ApiProperty } from "@nestjs/swagger";

import { Role, User } from "../user.entity";
import { UserRegistration } from "./user-registration.dto";

export class UserCreating extends UserRegistration {
	@ApiProperty()
	public role: Role;

	constructor(user: User) {
		super(user);
		this.role = user.role;
	}
}
