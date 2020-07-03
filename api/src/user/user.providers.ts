import { model, Model } from "mongoose";

import { userSchema } from "./user.entity";
import { IUser } from "./user.interface";

export const USER_MODEL = "USER_MODEL";

export const UserModel = model<IUser>("User", userSchema);

export const userProviders = [
	{
		provide: USER_MODEL,
		useValue: UserModel,
	},
];
