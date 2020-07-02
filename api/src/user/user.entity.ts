import { Schema } from "mongoose";
import { createHash } from "crypto";

import { IUser } from "./user.interface";

const userSchema = new Schema({
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
		enum: ["SuperAdmin", "Admin", "User"],
		default: "User",
		required: true,
	},
});

export { userSchema };
