import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Board } from "./board.entity";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Board])],
	controllers: [BoardController],
	providers: [BoardService],
	exports: [BoardService],
})
export class BoardModule {}
