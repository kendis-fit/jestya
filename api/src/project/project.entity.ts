import { Schema, Types } from "mongoose";
import { IProject } from "./project.interface";
import { UserModel } from "src/user/user.providers";

const projectShema = new Schema({
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

projectShema.pre<IProject>("remove", function (next) {
	UserModel.updateOne({}, { $pull: { projects: { _id: this.creator._id } } }, err => {
		if (err) {
			next(err);
		} else {
			next();
		}
	});
});

export { projectShema };
