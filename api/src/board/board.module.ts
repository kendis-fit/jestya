import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Board } from "./board.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Board])],
})
export class BoardModule {}
