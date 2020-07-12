import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Task } from "./task.entity";
import { TaskService } from "./task.service";
import { UserModule } from "../user/user.module";
import { BoardModule } from "../board/board.module";
import { ComponentModule } from "../component/component.module";

@Module({
	imports: [TypeOrmModule.forFeature([Task]), BoardModule, UserModule, ComponentModule],
	providers: [TaskService],
	exports: [TaskService],
})
export class TaskModule {}
