import { UserRegistration } from "./user-registration.dto";

export type UserCreatingType = "Admin" | "User";

export class UserCreating extends UserRegistration {
	public role: UserCreatingType;
}
