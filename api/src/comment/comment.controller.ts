import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, Req, Put, Param, Delete } from "@nestjs/common";

import { CommentService } from "./comment.service";
import { CommentUpdate } from "./dto/comment-update.dto";
import { CommentCreated } from "./dto/comment-created.dto";
import { CommentCreating } from "./dto/comment-creating.dto";

@ApiTags("comments")
@Controller("comments")
export class CommentController {
	constructor(public readonly commentService: CommentService) {}

	@Post()
	public async create(@Body() comment: CommentCreating, @Req() req): Promise<CommentCreated> {
		const newComment = await this.commentService.create(req.user.id, comment);
		return new CommentCreated(newComment.id);
	}

	@Put(":id")
	public async update(@Param("id") commentId: string, @Body() comment: CommentUpdate): Promise<void> {
		await this.commentService.update(commentId, comment);
	}

	@Delete(":id")
	public async remove(@Param("id") commentId): Promise<void> {
		await this.commentService.remove(commentId);
	}
}
