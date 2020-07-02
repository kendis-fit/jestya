import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";

import { IUser } from "./user.interface";
import { USER_MODEL } from "./user.providers";
import { UserLogin } from "./dto/user-login.dto";

@Injectable()
export class UserService {
	constructor(@Inject(USER_MODEL) private readonly users: Model<IUser>) {}

	public login(user: UserLogin) {}
}
