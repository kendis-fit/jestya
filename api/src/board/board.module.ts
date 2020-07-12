import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Board } from "./board.entity";
import { BoardService } from "./board.service";

@Module({
	imports: [TypeOrmModule.forFeature([Board])],
	providers: [BoardService],
	exports: [BoardService],
})
export class BoardModule {}
