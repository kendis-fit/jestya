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

userSchema.pre<IUser>("save", function (next) {
	this.password = createHash("sha256").update(this.password).digest("hex");
	next();
});

export { userSchema };
