import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";

import config from "../../.config";

@Module({
	imports: [
		UserModule,
		ProjectModule,
		ConfigModule.forRoot({
			load: [config[process.env.NODE_ENV]],
		}),
	],
})
export class AppModule {}
