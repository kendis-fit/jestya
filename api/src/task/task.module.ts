import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Task } from "./task.entity";
import { TaskService } from "./task.service";
import { UserModule } from "src/user/user.module";
import { TaskController } from "./task.controller";
import { BoardModule } from "src/board/board.module";
import { ComponentModule } from "src/component/component.module";

@Module({
	imports: [TypeOrmModule.forFeature([Task]), BoardModule, UserModule, ComponentModule],
	controllers: [TaskController],
	providers: [TaskService],
	exports: [TaskService],
})
export class TaskModule {}
