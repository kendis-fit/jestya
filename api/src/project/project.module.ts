import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Project } from "./project.entity";
import { ProjectService } from "./project.service";
import { BoardModule } from "src/board/board.module";
import { ProjectController } from "./project.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Project]), BoardModule],
	providers: [ProjectService],
	controllers: [ProjectController],
})
export class ProjectModule {}
