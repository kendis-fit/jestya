import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Comment } from "./comment.entity";
import { TaskModule } from "src/task/task.module";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Comment]), TaskModule],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}
