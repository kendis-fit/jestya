import { Document } from "mongoose";

import { IUser } from "src/user/user.interface";

export interface IProject extends Document {
	name: string;
	description?: string;
	createdAt: Date;
	users: IUser[];
}
