import { Comment } from "../comment.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CommentUpdate {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public content: string;

	constructor(comment: Comment) {
		this.content = comment.content;
	}
}
