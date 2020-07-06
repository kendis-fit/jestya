import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import config from "../.config";
import { User } from "./user/user.entity";
import { Board } from "./board/board.entity";
import { UserModule } from "./user/user.module";
import { Project } from "./project/project.entity";
import { BoardModule } from "./board/board.module";
import { ProjectModule } from "./project/project.module";

@Module({
	imports: [
		UserModule,
		ProjectModule,
		ConfigModule.forRoot({
			load: [config[process.env.NODE_ENV || "development"]],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				type: "postgres",
				host: config.get<string>("database.host"),
				port: config.get<number>("database.port"),
				username: config.get<string>("database.username"),
				password: config.get<string>("database.password"),
				database: config.get<string>("database.database"),
				entities: [User, Project, Board],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		BoardModule,
	],
})
export class AppModule {}
