import {
	Controller,
	UseGuards,
	Body,
	Put,
	Delete,
	Param,
	ParseUUIDPipe,
	HttpCode,
} from "@nestjs/common";
import {
	ApiTags,
	ApiBearerAuth,
	ApiNoContentResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiBadRequestResponse,
} from "@nestjs/swagger";

import { Role } from "../../user/user.entity";
import { Error, ErrorBadRequest } from "../../helpers/error.interfaces";
import { CommentService } from "../../comment/comment.service";
import { CommentUpdate } from "../../comment/dto/comment-update.dto";
import { UserSelfGuard } from "../../guards/user-self/user-self.guard";
import { JwtProjectsGuard } from "../../guards/jwt-projects/jwt-projects.guard";
import { RoleProjectsGuard } from "../../guards/role-projects/role-projects.guard";

@ApiBearerAuth()
@ApiTags("projects")
@Controller("projects")
export class ProjectCommentController {
	constructor(private readonly commentService: CommentService) {}

	@ApiNoContentResponse()
	@ApiBadRequestResponse({ type: ErrorBadRequest })
	@ApiNotFoundResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@HttpCode(204)
	@Put(":id/comments/:commentId")
	@UseGuards(JwtProjectsGuard, new RoleProjectsGuard([Role.USER]), new UserSelfGuard([]))
	public async updateComment(
		@Param("commentId", ParseUUIDPipe) commentId: string,
		@Body() comment: CommentUpdate
	): Promise<void> {
		await this.commentService.update(commentId, comment);
	}

	@ApiNoContentResponse()
	@ApiNotFoundResponse({ type: Error })
	@ApiForbiddenResponse({ type: Error })
	@HttpCode(204)
	@Delete(":id/comments/:commentId")
	@UseGuards(
		JwtProjectsGuard,
		new RoleProjectsGuard([Role.USER]),
		new UserSelfGuard([Role.SUPER_ADMIN, Role.ADMIN])
	)
	public async removeComment(
		@Param("commentId", ParseUUIDPipe) commentId: string
	): Promise<void> {
		await this.commentService.remove(commentId);
	}
}
