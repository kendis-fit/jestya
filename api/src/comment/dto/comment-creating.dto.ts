import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { Comment } from "../comment.entity";

export class CommentCreating {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public content: string;

	constructor(comment: Comment) {
		this.content = comment.content;
	}
}
