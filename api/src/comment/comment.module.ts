import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Comment } from "./comment.entity";
import { TaskModule } from "../task/task.module";
import { CommentService } from "./comment.service";

@Module({
	imports: [TypeOrmModule.forFeature([Comment]), TaskModule],
	providers: [CommentService],
	exports: [CommentService],
})
export class CommentModule {}
