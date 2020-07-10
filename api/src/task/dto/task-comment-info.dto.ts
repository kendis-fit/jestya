import { Comment } from "../../comment/comment.entity";

export class TaskCommentInfo {
	public id: string;
	public content: string;
	public createdAt: Date;
	public userName: string;

	constructor(comment: Comment) {
		this.id = comment.id;
		this.content = comment.content;
		this.createdAt = comment.createdAt;
		this.userName = comment.user.name;
	}
}
