import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import config from "../.config";
import { User } from "./user/user.entity";
import { Task } from "./task/task.entity";
import { Board } from "./board/board.entity";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { Project } from "./project/project.entity";
import { Comment } from "./comment/comment.entity";
import { ProjectModule } from "./project/project.module";
import { Component } from "./component/component.entity";
import { ComponentModule } from "./component/component.module";

export const REDIS_SERVICE = "REDIS_SERVICE";

@Module({
	imports: [
		AuthModule,
		UserModule,
		ProjectModule,
		ComponentModule,
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
				entities: [User, Project, Board, Task, Component, Comment],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		ClientsModule.registerAsync([
			{
				name: REDIS_SERVICE,
				imports: [ConfigModule],
				useFactory: (config: ConfigService) => ({
					transport: Transport.REDIS,
					options: {
						url: config.get<string>("redis.url"),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
})
export class AppModule {}
