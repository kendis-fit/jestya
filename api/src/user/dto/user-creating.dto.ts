import { ApiProperty } from "@nestjs/swagger";

import { Role } from "../user.entity";
import { UserRegistration } from "./user-registration.dto";

export class UserCreating extends UserRegistration {
	@ApiProperty()
	public role: Role;
}
