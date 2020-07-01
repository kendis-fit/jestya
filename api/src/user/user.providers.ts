import { model } from "mongoose";

import { userSchema } from "./user.entity";
import { IUser } from "./user.interface";

export const USER_MODEL = "USER_MODEL";

export const userProviders = [
	{
		provide: USER_MODEL,
		useValue: model<IUser>("User", userSchema),
	},
];
