import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Project } from "./project.entity";
import { UserModule } from "src/user/user.module";
import { ProjectService } from "./project.service";
import { projectProviders } from "./project.providers";
import { ProjectController } from "./project.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Project]), UserModule],
	providers: [ProjectService, ...projectProviders],
	controllers: [ProjectController],
})
export class ProjectModule {}
