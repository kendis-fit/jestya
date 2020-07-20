import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, Post, UseGuards, Body, Put, Delete, Param, ParseUUIDPipe } from "@nestjs/common";

import { Role } from "../../user/user.entity";
import { User } from "../../decorators/user.decorator";
import { UserSelfGuard } from "../../guards/user-self.guard";
import { CommentService } from "../../comment/comment.service";
import { JwtProjectsGuard } from "../../guards/jwt-projects.guard";
import { RoleProjectsGuard } from "../../guards/role-projects.guard";
import { CommentUpdate } from "../../comment/dto/comment-update.dto";
import { CommentCreated } from "../../comment/dto/comment-created.dto";
import { CommentCreating } from "../../comment/dto/comment-creating.dto";

@ApiBearerAuth()
@ApiTags("projects")
@Controller("projects")
export class ProjectCommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post(":id/comments")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]))
	public async createComment(@Body() comment: CommentCreating, @User("id") userId: string): Promise<CommentCreated> {
		const newComment = await this.commentService.create(userId, comment);
		return new CommentCreated(newComment.id);
	}

	@Put(":id/comments/:commentId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]), new UserSelfGuard([]))
	public async updateComment(
		@Param("commentId", ParseUUIDPipe) commentId: string,
		@Body() comment: CommentUpdate
	): Promise<void> {
		await this.commentService.update(commentId, comment);
	}

	@Delete(":id/comments/:commentId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]), new UserSelfGuard([Role.SUPER_ADMIN, Role.ADMIN]))
	public async removeComment(@Param("commentId", ParseUUIDPipe) commentId: string): Promise<void> {
		await this.commentService.remove(commentId);
	}
}
