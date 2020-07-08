import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Board } from "./board.entity";
import { BoardService } from "./board.service";
import { TaskModule } from "src/task/task.module";
import { BoardController } from "./board.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Board]), TaskModule],
	providers: [BoardService],
	exports: [BoardService],
	controllers: [BoardController],
})
export class BoardModule {}
