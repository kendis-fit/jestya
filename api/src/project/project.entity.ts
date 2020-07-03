import { Schema, Types } from "mongoose";

export const projectShema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	creator: {
		type: Types.ObjectId,
		ref: "User",
		required: false,
	},
	users: [
		{
			type: Types.ObjectId,
			ref: "User",
		},
	],
});
