import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import config from "../../.config";
import { User } from "./user/user.entity";
import { UserModule } from "./user/user.module";
import { Project } from "./project/project.entity";
import { ProjectModule } from "./project/project.module";

@Module({
	imports: [
		UserModule,
		ProjectModule,
		ConfigModule.forRoot({
			load: [config[process.env.NODE_ENV]],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				type: "postgres",
				host: config.get<string>("database.host"),
				port: config.get<number>("database.port"),
				username: config.get("database.username"),
				password: config.get("database.password"),
				database: config.get("database.database"),
				entities: [User, Project],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
})
export class AppModule {}
