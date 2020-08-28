import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "../user/user.entity";
import { SearchService } from "./search.service";
import { Project } from "../project/project.entity";
import { SearchController } from "./search.controller";

@Module({
	imports: [TypeOrmModule.forFeature([User, Project])],
	controllers: [SearchController],
	providers: [SearchService],
	exports: [SearchService],
})
export class SearchModule {}
