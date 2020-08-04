import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Project } from "./project.entity";
import { TaskModule } from "../task/task.module";
import { UserModule } from "../user/user.module";
import { ProjectService } from "./project.service";
import { BoardModule } from "../board/board.module";
import { CommentModule } from "../comment/comment.module";
import { ProjectController } from "./controllers/project.controller";
import { ProjectTaskController } from "./controllers/project-task.controller";
import { ProjectBoardController } from "./controllers/project-board.controller";
import { ProjectCommentController } from "./controllers/project-comment.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Project]), BoardModule, CommentModule, TaskModule, UserModule],
	controllers: [ProjectController, ProjectTaskController, ProjectBoardController, ProjectCommentController],
	providers: [ProjectService],
	exports: [ProjectService],
})
export class ProjectModule {}
