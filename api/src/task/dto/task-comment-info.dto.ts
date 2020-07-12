import { Comment } from "../../comment/comment.entity";
import { ApiProperty } from "@nestjs/swagger";

export class TaskCommentInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public content: string;

	@ApiProperty({ type: Date })
	public createdAt: Date;

	@ApiProperty()
	public userName: string;

	constructor(comment: Comment) {
		this.id = comment.id;
		this.content = comment.content;
		this.createdAt = comment.createdAt;
		this.userName = comment.user.name;
	}
}
