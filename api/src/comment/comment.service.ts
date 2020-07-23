import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

import { Comment } from "./comment.entity";
import { CommentUpdate } from "./dto/comment-update.dto";
import { CommentCreating } from "./dto/comment-creating.dto";

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>
	) {}

	public async findById(commentId: string): Promise<Comment> {
		const foundComment = this.commentRepository.findOne(commentId);
		if (!foundComment) {
			throw new NotFoundException("The comment isn't found");
		}
		return foundComment;
	}

	public async create(userId: string, taskId: string, comment: CommentCreating): Promise<Comment> {
		const newComment = new Comment();
		newComment.user = { id: userId } as any;
		newComment.content = comment.content;
		newComment.task = { id: taskId } as any;

		await this.commentRepository.save(newComment);
		return newComment;
	}

	public async update(commentId: string, comment: CommentUpdate): Promise<Comment> {
		const foundComment = await this.findById(commentId);
		foundComment.content = comment.content;

		await this.commentRepository.save(foundComment);
		return foundComment;
	}

	public async remove(commentId: string): Promise<void> {
		const deletedComment = await this.commentRepository.delete(commentId);
		if (!deletedComment.affected) {
			throw new NotFoundException("The commen isn't found");
		}
	}
}
