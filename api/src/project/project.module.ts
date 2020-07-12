import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Project } from "./project.entity";
import { TaskModule } from "../task/task.module";
import { ProjectService } from "./project.service";
import { BoardModule } from "../board/board.module";
import { ProjectController } from "./project.controller";
import { CommentModule } from "../comment/comment.module";

@Module({
	imports: [TypeOrmModule.forFeature([Project]), BoardModule, CommentModule, TaskModule],
	providers: [ProjectService],
	controllers: [ProjectController],
})
export class ProjectModule {}
