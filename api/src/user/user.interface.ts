import { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	login: string;
	password: string;
	role: string;
	createdAt: Date;
}
