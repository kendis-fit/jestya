import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProjectCacheModule } from "./project-cache/project-cache.module";

import config from "../.config";

@Module({
	imports: [
		ProjectCacheModule,
		ConfigModule.forRoot({
			load: [config[process.env.NODE_ENV || "development"]],
		}),
	],
})
export class AppModule {}
