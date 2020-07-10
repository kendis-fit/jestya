import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Task } from "./task.entity";
import { TaskService } from "./task.service";
import { UserModule } from "src/user/user.module";
import { TaskController } from "./task.controller";
import { BoardModule } from "src/board/board.module";

@Module({
	imports: [TypeOrmModule.forFeature([Task]), BoardModule, UserModule],
	providers: [TaskService],
	exports: [TaskService],
	controllers: [TaskController],
})
export class TaskModule {}
