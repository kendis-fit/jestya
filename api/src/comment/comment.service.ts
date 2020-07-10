import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { Comment } from "./comment.entity";
import { TaskService } from "../task/task.service";
import { CommentCreating } from "./dto/comment-creating.dto";
import { CommentUpdate } from "./dto/comment-update.dto";

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		public readonly commentRepository: Repository<Comment>,
		public readonly taskService: TaskService
	) {}

	public async findById(commentId: string): Promise<Comment> {
		const foundComment = this.commentRepository.findOne(commentId);
		if (!foundComment) {
			throw new HttpException({ message: "Comment wasn't found" }, HttpStatus.NOT_FOUND);
		}
		return foundComment;
	}

	public async create(userId: string, comment: CommentCreating): Promise<Comment> {
		const foundTask = await this.taskService.findById(comment.taskId);

		const newComment = new Comment();
		newComment.userId = userId;
		newComment.content = comment.content;
		newComment.task = foundTask;

		await this.commentRepository.save(newComment);
		return newComment;
	}

	public async update(commentId: string, comment: CommentUpdate): Promise<Comment> {
		const foundComment = await this.findById(commentId);
		foundComment.content = comment.content;

		await this.commentRepository.update(commentId, foundComment);
		return foundComment;
	}

	public async remove(commentId: string): Promise<void> {
		const foundComment = await this.findById(commentId);
		await this.commentRepository.remove(foundComment);
	}
}
