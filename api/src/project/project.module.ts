import { Module } from "@nestjs/common";

import { UserModule } from "src/user/user.module";
import { ProjectService } from "./project.service";
import { projectProviders } from "./project.providers";
import { ProjectController } from "./project.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
	imports: [DatabaseModule, UserModule],
	providers: [ProjectService, ...projectProviders],
	controllers: [ProjectController],
})
export class ProjectModule {}
