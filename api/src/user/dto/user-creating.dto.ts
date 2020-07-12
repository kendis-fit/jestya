import { UserRegistration } from "./user-registration.dto";
import { ApiProperty } from "@nestjs/swagger";

export type UserCreatingType = "Admin" | "User";

export class UserCreating extends UserRegistration {
	@ApiProperty()
	public role: UserCreatingType;
}
