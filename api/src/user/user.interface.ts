import { Document } from "mongoose";

import { IProject } from "src/project/project.interface";

export interface IUser extends Document {
	name: string;
	login: string;
	password: string;
	role: string;
	createdAt: Date;
	projects: IProject[];
}
