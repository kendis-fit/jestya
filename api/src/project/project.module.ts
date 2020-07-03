import { Module } from "@nestjs/common";

import { ProjectService } from "./project.service";
import { projectProviders } from "./project.providers";
import { ProjectController } from "./project.controller";

@Module({
	providers: [ProjectService, ...projectProviders],
	controllers: [ProjectController],
})
export class ProjectModule {}
