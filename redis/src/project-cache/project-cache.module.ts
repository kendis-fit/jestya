import { Module } from "@nestjs/common";

import { DatabaseModule } from "src/database/database.module";
import { ProjectCacheService } from "./project-cache.service";
import { ProjectCacheController } from "./project-cache.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [ProjectCacheController],
	providers: [ProjectCacheService],
})
export class ProjectCacheModule {}
