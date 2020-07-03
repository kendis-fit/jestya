import { Schema, Types } from "mongoose";

export enum ROLE {
	User = "User",
	Admin = "Admin",
	SuperAdmin = "SuperAdmin",
}

export const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	login: {
		type: String,
		required: true,
		minlength: 8,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	role: {
		type: String,
		enum: [ROLE.SuperAdmin, ROLE.Admin, ROLE.User],
		default: ROLE.User,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	projects: [
		{
			type: Types.ObjectId,
			ref: "Project",
		},
	],
});
