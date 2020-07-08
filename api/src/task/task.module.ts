import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Task } from "./task.entity";
import { TaskService } from "./task.service";

@Module({
	imports: [TypeOrmModule.forFeature([Task])],
	providers: [TaskService],
	exports: [TaskService],
})
export class TaskModule {}
