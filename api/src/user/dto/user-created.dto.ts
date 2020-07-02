import { UserRegistration } from "./user-registration.dto";

export type UserCreatedType = "Admin" | "User";

export class UserCreated extends UserRegistration {
	public role: UserCreatedType;
}
